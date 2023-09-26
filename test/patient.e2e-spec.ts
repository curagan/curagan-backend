import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';

let app: INestApplication;
let token: string;
let userId: string;

const defaultdata = {
  email: 'patient@testing.com',
  password: 'patienttest',
  name: 'patient test',
  imageURL: 'string',
};
const randomData = {
  email: `patient${Math.floor(Math.random() * 1000)}@testing.com`,
  password: 'patienttest',
  name: 'patient test',
  imageURL: 'string',
};

const edittedData = {
  ...defaultdata,
  name: 'hello new patient',
};

const changePassword = {
  oldPassword: 'patienttest',
  newPassword: 'hallopatient',
};

beforeEach(async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleFixture.createNestApplication();
  await app.init();
});

describe('Patient Controller (e2e)', () => {
  it('PATIENT REGISTER', async () => {
    const response = await request(app.getHttpServer())
      .post('/patient/auth/register')
      .send(defaultdata);
    if (response.status === 409) {
      const randomResponse = await request(app.getHttpServer())
        .post('/patient/auth/register')
        .send(randomData);
      return (
        expect(randomResponse.status).toBe(201),
        expect(randomResponse.body).toBeDefined()
      );
    }
    expect(response.status).toBe(201);
    expect(response.body).toBeDefined;
  });

  it('PATIENT LOGIN', async () => {
    const response = await request(app.getHttpServer())
      .post('/patient/auth/login')
      .send({
        email: defaultdata.email,
        password: defaultdata.password,
      });
    token = response.body.access_token;
    userId = response.body.response;
    expect(response.status).toBe(201);
    expect(response.body).toBeDefined();

    const wrongResponse = await request(app.getHttpServer())
      .post('/patient/auth/login')
      .send({
        email: defaultdata.email,
        password: 'wrongPasswordValue',
      });
    expect(wrongResponse.status).toBe(401);
  });

  it('GET ALL PATIENTS', async () => {
    const response = await request(app.getHttpServer())
      .get('/patient')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });

  it('GET PATIENT PROFILE', async () => {
    const response = await request(app.getHttpServer())
      .get(`/patient/${userId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });

  it('EDIT PATIENT PROFILE', async () => {
    const response = await request(app.getHttpServer())
      .put(`/patient/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(edittedData);

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });

  it('CHANGE PASSWORD', async () => {
    const response = await request(app.getHttpServer())
      .patch(`/patient/change-password/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(changePassword);
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();

    const changedPasswordLoginResponse = await request(app.getHttpServer())
      .post('/patient/auth/login')
      .send({
        email: defaultdata.email,
        password: changePassword.newPassword,
      });
    expect(changedPasswordLoginResponse.status).toBe(201);
    expect(changedPasswordLoginResponse.body).toBeDefined();

    await request(app.getHttpServer())
      .patch(`/patient/change-password/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        oldPassword: changePassword.newPassword,
        newPassword: changePassword.oldPassword,
      });
  });

  it('DELETE PATIENT', async () => {
    const response = await request(app.getHttpServer())
      .delete(`/patient/${userId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
});

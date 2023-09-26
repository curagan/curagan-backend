import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';

describe('AppController e2e', () => {
  let app: INestApplication;
  let token: string;
  const doctorId: string = 'bd788478-513d-4a09-812e-f1c078f32144';
  const data = {
    email: 'testing@email.com',
    password: 'doktertest',
    name: 'doktertest',
    imageURL: 'abc',
    location: 'surabaya',
    hospital: 'rsud',
  };
  const data1 = {
    ...data,
    email: 'testing1@email.com',
    location: 'jakarta',
    hospital: 'rsabc',
  };
  const data2 = {
    ...data,
    email: 'testing2@email.com',
    location: 'malang',
    hospital: 'rsi',
  };
  const updateData = {
    imageURL: 'def',
    location: 'malang',
    schedule: [
      {
        days: 'senin',
        time: [
          `${Math.floor(Math.random() * 25)}.00`,
          `${Math.floor(Math.random() * 25)}.00`,
        ],
      },
      {
        days: 'selasa',
        time: [
          `${Math.floor(Math.random() * 25)}.00`,
          `${Math.floor(Math.random() * 25)}.00`,
        ],
      },
    ],
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('Doctor Controller (e2e)', () => {
    it('DOCTOR REGISTER', async () => {
      const registerResponse = await request(app.getHttpServer())
        .post('/doctor/auth/register')
        .send(data);
      if (registerResponse.status === 409) {
        return expect(registerResponse.status).toBe(409);
      }
      expect(registerResponse.status).toBe(201);
      expect(registerResponse).toBeDefined();
    });

    it('DOCTOR LOGIN', async () => {
      const loginResponse = await request(app.getHttpServer())
        .post('/doctor/auth/login')
        .send({
          email: data.email,
          password: data.password,
        });
      token = loginResponse.body.access_token;
      expect(loginResponse.status).toBe(201);
      expect(loginResponse).toBeDefined();
    });

    it('DOCTOR REGISTER CONFLICT', async () => {
      const registerResponse = await request(app.getHttpServer())
        .post('/doctor/auth/register')
        .send(data);
      expect(registerResponse.status).toBe(409);
    });

    it('FILTERING DOCTOR', async () => {
      await request(app.getHttpServer())
        .post('/doctor/auth/register')
        .send(data1);
      await request(app.getHttpServer())
        .post('/doctor/auth/register')
        .send(data2);
      const location = ['surabaya', 'jakarta', 'malang'];
      const randomValue = location[Math.floor(Math.random() * location.length)];
      const searchResponse = await request(app.getHttpServer()).get(
        `/doctor/query?location=${randomValue}`,
      );
      expect(searchResponse.status).toBe(200);
      expect(searchResponse).toBeDefined();
    });

    it('GET ALL DOCTOR', async () => {
      const searchResponse = await request(app.getHttpServer())
        .get('/doctor/')
        .set('Authorization', `Bearer ${token}`);
      expect(searchResponse.status).toBe(200);
      expect(searchResponse).toBeDefined();
    });

    it('GET DOCTOR BY ID', async () => {
      const searchResponse = await request(app.getHttpServer())
        .get(`/doctor/${doctorId}`)
        .set('Authorization', `Bearer ${token}`);
      expect(searchResponse.status).toBe(200);
      expect(searchResponse).toBeDefined();
    });

    it("UPDATE DOCTOR'S SCHEDULE", async () => {
      const searchResponse = await request(app.getHttpServer())
        .get(`/doctor/${doctorId}`)
        .set('Authorization', `Bearer ${token}`);
      const updateResponse = await request(app.getHttpServer())
        .put(`/doctor/${doctorId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(updateData);
      expect(searchResponse.status).toEqual(200);
      expect(searchResponse.body).not.toEqual(updateResponse.body);
    });

    it('CHANGE PASSWORD', async () => {
      const defaultPassword = {
        oldPassword: 'newpassworddoctor',
        newPassword: 'doktertest',
      };
      const newPassword = {
        oldPassword: 'doktertest',
        newPassword: 'newpassworddoctor',
      };
      const updatePassword = await request(app.getHttpServer())
        .patch(`/doctor/change-password/${doctorId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(newPassword);
      expect(updatePassword.status).toBe(200);
      expect(updatePassword.body).toBeDefined();

      const oldLogin = await request(app.getHttpServer())
        .post('/doctor/auth/login')
        .send({
          email: data.email,
          password: data.password,
        });

      const newLogin = await request(app.getHttpServer())
        .post('/doctor/auth/login')
        .send({
          email: data.email,
          password: newPassword.newPassword,
        });
      expect(oldLogin.status).toBe(401);
      expect(newLogin.status).toBe(201);

      // CHANGE PASSWORD BACK TO DEFAULT
      await request(app.getHttpServer())
        .patch(`/doctor/change-password/${doctorId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(defaultPassword);
    });
  });
});

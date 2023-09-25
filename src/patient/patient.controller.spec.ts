import { Test, TestingModule } from '@nestjs/testing';
import { PatientController } from './patient.controller';
import { PatientService } from './patient.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';

describe('PatientController', () => {
  let controller: PatientController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PatientController],
      providers: [PatientService, PrismaService, JwtService],
    }).compile();

    controller = module.get<PatientController>(PatientController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

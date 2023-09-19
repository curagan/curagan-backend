import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt/dist';

@Module({
  controllers: [PatientController],
  providers: [PatientService, PrismaService, JwtService],
})
export class PatientModule {}

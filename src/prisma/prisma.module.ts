import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { DoctorService } from '../doctor/doctor.service';
import { PatientService } from '../patient/patient.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService]
})
export class PrismaModule { }

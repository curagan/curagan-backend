import { Module } from '@nestjs/common';
import { DoctorModule } from './doctor/doctor.module';
import { PatientModule } from './patient/patient.module';
import { StatusModule } from './status/status.module';
import { AppoinmentsModule } from './appoinments/appointments.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [DoctorModule, PatientModule, StatusModule, AppoinmentsModule, PrismaModule],
})
export class AppModule { }

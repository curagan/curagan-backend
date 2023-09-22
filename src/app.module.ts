import { Module } from '@nestjs/common';
import { DoctorModule } from './doctor/doctor.module';
import { PatientModule } from './patient/patient.module';
import { StatusModule } from './status/status.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [DoctorModule, PatientModule, StatusModule, AppointmentsModule, PrismaModule],
})
export class AppModule { }

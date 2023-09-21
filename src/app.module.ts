import { Module } from '@nestjs/common';
import { DoctorModule } from './doctor/doctor.module';
import { PatientModule } from './patient/patient.module';
import { StatusModule } from './status/status.module';

@Module({
  imports: [DoctorModule, PatientModule, StatusModule],
})
export class AppModule {}

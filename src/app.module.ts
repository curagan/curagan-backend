import { Module } from '@nestjs/common';
import { DoctorModule } from './doctor/doctor.module';
import { PatientModule } from './patient/patient.module';

@Module({
  imports: [DoctorModule, PatientModule],
})
export class AppModule {}

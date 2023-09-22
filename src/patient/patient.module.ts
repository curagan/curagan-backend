import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { PrismaService } from '../prisma/prisma.service'
import { JwtService } from '@nestjs/jwt/dist';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [PatientController],
  providers: [PatientService, PrismaService, JwtService],
  imports: [PrismaModule]
})
export class PatientModule { }

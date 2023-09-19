import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt/dist';

@Module({
  controllers: [DoctorController],
  providers: [DoctorService, PrismaService, JwtService],
})
export class DoctorModule {}

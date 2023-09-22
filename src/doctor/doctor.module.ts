import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { PrismaService } from '../prisma/prisma.service'
import { JwtService } from '@nestjs/jwt/dist';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [DoctorController],
  providers: [DoctorService, PrismaService, JwtService],
  imports: [PrismaModule]
})
export class DoctorModule { }

import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
@Module({
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
  imports: [PrismaModule, JwtModule],
})
export class AppointmentsModule {}

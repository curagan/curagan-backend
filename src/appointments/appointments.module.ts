import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
  imports: [PrismaModule]
})
export class AppointmentsModule { }

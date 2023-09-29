import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Appointment } from './entities/appointment.entity';
import { AuthGuard, RoleGuard, Roles } from '../doctor/doctor.guard';

@Controller('appointments')
@ApiTags('appointments')
export class AppointmentsController {
  constructor(private readonly AppointmentsService: AppointmentsService) {}

  @Post()
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: Appointment })
  @UseGuards(AuthGuard)
  create(@Body() CreateAppointmentDto: CreateAppointmentDto) {
    return this.AppointmentsService.create(CreateAppointmentDto);
  }

  @Get('/my-appointments/:id')
  @ApiBearerAuth()
  @ApiOkResponse({ type: Appointment, isArray: true })
  @UseGuards(AuthGuard)
  findAppointments(@Param('id') id: string) {
    return this.AppointmentsService.findAppointments(id);
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ type: Appointment })
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.AppointmentsService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ type: Appointment })
  @UseGuards(RoleGuard)
  @Roles('doctor')
  @UseGuards(AuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ) {
    return this.AppointmentsService.update(id, updateAppointmentDto);
  }

  @Get('/history/:doctorId/')
  @UseGuards(AuthGuard)
  getHistory(
    @Query('start') start: string,
    @Query('end') end: string,
    @Param('doctorId') id: string,
  ) {
    console.log(start);
    console.log(end);
    return this.AppointmentsService.getHistory(start, end, id);
  }
}

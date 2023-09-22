import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppoinmentDto } from './dto/update-appointment.dto';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly AppointmentsService: AppointmentsService) { }

  @Post()
  create(@Body() CreateAppointmentDto: CreateAppointmentDto) {
    return this.AppointmentsService.create(CreateAppointmentDto);
  }

  @Get()
  findAll() {
    return this.AppointmentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.AppointmentsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAppoinmentDto: UpdateAppoinmentDto) {
    return this.AppointmentsService.update(id, updateAppoinmentDto);
  }
}

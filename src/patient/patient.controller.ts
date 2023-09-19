import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto, LoginPatient } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post('/auth/register')
  register(@Body() registerDto: CreatePatientDto) {
    return this.patientService.register(registerDto);
  }

  @Post('/auth/login')
  login(@Body() loginDto: LoginPatient) {
    return this.patientService.login(loginDto);
  }

  @Get('/')
  getAllPatients() {
    return this.patientService.getAllPatients();
  }
}

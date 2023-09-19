import { Controller, Post, Body, Get } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto, LoginDto } from './dto/create-doctor.dto';

@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  /// AUTH CONTROLLER
  @Post('/auth/login')
  login(@Body() loginDto: LoginDto) {
    return this.doctorService.login(loginDto);
  }

  @Post('/auth/register')
  register(@Body() registerDto: CreateDoctorDto) {
    return this.doctorService.register(registerDto);
  }

  /// BASIC CRUD
  @Get('/')
  getAll() {
    return this.doctorService.getAllDoctor();
  }
}

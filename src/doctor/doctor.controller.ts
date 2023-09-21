import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto, LoginDto } from './dto/create-doctor.dto';
import { AuthGuard, RoleGuard, Roles } from './doctor.guard';

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
  @UseGuards(RoleGuard)
  @Roles('Doctor')
  @UseGuards(AuthGuard)
  getAll() {
    return this.doctorService.getAllDoctor();
  }
}

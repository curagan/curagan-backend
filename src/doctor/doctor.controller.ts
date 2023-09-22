import { Controller, Post, Body, Get, UseGuards, Param, Put, Patch, Delete } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto, LoginDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
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

  @Get('/:id')
  @UseGuards(RoleGuard)
  @Roles('Doctor')
  @UseGuards(AuthGuard)
  getDoctorById(@Param('id') id: string) {
    return this.doctorService.getDoctorById(id);
  }

  @Put('/:id')
  @UseGuards(RoleGuard)
  @Roles('Doctor')
  @UseGuards(AuthGuard)
  updateDoctor(@Param('id') id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
    return this.doctorService.updateDoctor(id, updateDoctorDto);
  }

  @Patch('/:id')
  @UseGuards(RoleGuard)
  @Roles('Doctor')
  @UseGuards(AuthGuard)
  partialUpdateDoctor(@Param('id') id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
    return this.doctorService.partialUpdateDoctor(id, updateDoctorDto);
  }

  @Delete('/:id')
  @UseGuards(RoleGuard)
  @Roles('Doctor')
  @UseGuards(AuthGuard)
  deleteDoctor(@Param('id') id: string) {
    return this.doctorService.deleteDoctor(id);
  }
}

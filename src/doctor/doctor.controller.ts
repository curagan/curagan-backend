import { Controller, Post, Body, Get, UseGuards, Param, Put, Patch, Delete, Query } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto, LoginDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { AuthGuard, RoleGuard, Roles } from './doctor.guard';
import { ApiCreatedResponse, ApiOkResponse, ApiTags, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { Doctor } from './entities/doctor.entity';

@Controller('doctor')
@ApiTags('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  /// AUTH CONTROLLER
  @Post('/auth/login')
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: Doctor })
  login(@Body() loginDto: LoginDto) {
    return this.doctorService.login(loginDto);
  }

  @Post('/auth/register')
  @ApiCreatedResponse({ type: Doctor })
  register(@Body() registerDto: CreateDoctorDto) {
    return this.doctorService.register(registerDto);
  }

  /// BASIC CRUD
  @Get('/')
  @UseGuards(RoleGuard)
  @Roles('Doctor')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: Doctor, isArray: true })
  @ApiQuery({name: 'q', description: 'search all doctors', required: false, type: String})
  getAll(@Query('q') query: string) {
    return this.doctorService.getAllDoctor();
  }

  @Get('/:id')
  @UseGuards(RoleGuard)
  @Roles('Doctor')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: Doctor })
  getDoctorById(@Param('id') id: string) {
    return this.doctorService.getDoctorById(id);
  }

  @Put('/:id')
  @UseGuards(RoleGuard)
  @Roles('Doctor')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: Doctor })
  updateDoctor(@Param('id') id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
    return this.doctorService.updateDoctor(id, updateDoctorDto);
  }

  @Patch('/:id')
  @UseGuards(RoleGuard)
  @Roles('Doctor')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: Doctor })
  partialUpdateDoctor(@Param('id') id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
    return this.doctorService.partialUpdateDoctor(id, updateDoctorDto);
  }

  @Delete('/:id')
  @UseGuards(RoleGuard)
  @Roles('Doctor')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: Doctor })
  deleteDoctor(@Param('id') id: string) {
    return this.doctorService.deleteDoctor(id);
  }
}

import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Param,
  Put,
  Patch,
  Delete,
  Query,
  Req,
} from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto, LoginDto } from './dto/create-doctor.dto';
import { ChangePassword, UpdateDoctorDto } from './dto/update-doctor.dto';
import { AuthGuard, AuthorGuard, RoleGuard, Roles } from './doctor.guard';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { Doctor } from './entities/doctor.entity';
import { Request } from 'express';

@Controller('doctor')
@ApiTags('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  /// AUTH CONTROLLER
  @Post('/auth/login')
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: Doctor })
  login(@Body() loginDto: LoginDto, @Req() req: Request) {
    return this.doctorService.login(loginDto, req);
  }

  @Post('/auth/register')
  @ApiCreatedResponse({ type: Doctor })
  register(@Body() registerDto: CreateDoctorDto) {
    return this.doctorService.register(registerDto);
  }

  // FILTER DOCTOR BY NAME, LOCATION AND HOSPITAL
  @Get('/query')
  searchDoctor(@Query('name') name: string) {
    return this.doctorService.searchDoctor(name);
  }

  /// BASIC CRUD
  @Get('/')
  @ApiOkResponse({ type: Doctor, isArray: true })
  @ApiQuery({
    name: 'q',
    description: 'search all doctors',
    required: false,
    type: String,
  })
  getAll() {
    return this.doctorService.getAllDoctor();
  }

  @Get('/:id')
  @ApiOkResponse({ type: Doctor })
  getDoctorById(@Param('id') id: string) {
    return this.doctorService.getDoctorById(id);
  }

  @Put('/:id')
  @UseGuards(AuthorGuard)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: Doctor })
  updateDoctor(
    @Param('id') id: string,
    @Body() updateDoctorDto: UpdateDoctorDto,
  ) {
    return this.doctorService.updateDoctor(id, updateDoctorDto);
  }

  @Delete('/:id')
  @UseGuards(AuthorGuard)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: Doctor })
  deleteDoctor(@Param('id') id: string, @Req() req: Request) {
    return this.doctorService.deleteDoctor(id, req);
  }

  @Patch('/change-password/:id')
  @UseGuards(AuthorGuard)
  @UseGuards(AuthGuard)
  changePassword(
    @Param('id') id: string,
    @Body() data: ChangePassword,
    @Req() req: Request,
  ) {
    return this.doctorService.changePassword(id, data, req);
  }
}

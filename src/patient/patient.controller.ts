import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto, LoginPatient } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Patient } from './entities/patient.entity';

@Controller('patient')
@ApiTags('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post('/auth/register')
  @ApiCreatedResponse({ type: Patient })
  register(@Body() registerDto: CreatePatientDto) {
    return this.patientService.register(registerDto);
  }

  @Post('/auth/login')
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: Patient })
  login(@Body() loginDto: LoginPatient) {
    return this.patientService.login(loginDto);
  }

  @Get('/')
  @ApiBearerAuth()
  @ApiOkResponse({ type: Patient })
  getAllPatients() {
    return this.patientService.getAllPatients();
  }

  @Get('/:id')
  @ApiBearerAuth()
  @ApiOkResponse({ type: Patient })
  getPatientById(@Param('id') id: string) {
    return this.patientService.getPatientById(id);
  }

  @Put('/:id')
  @ApiBearerAuth()
  @ApiOkResponse({ type: Patient })
  updatePatient(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientService.updatePatient(id, updatePatientDto);
  }

  @Patch('/:id')
  @ApiBearerAuth()
  @ApiOkResponse({ type: Patient })
  partialUpdatePatient(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientService.partialUpdatePatient(id, updatePatientDto);
  }

  @Delete('/:id')
  @ApiBearerAuth()
  @ApiOkResponse({ type: Patient })
  deletePatient(@Param('id') id: string) {
    return this.patientService.deletePatient(id);
  }
}

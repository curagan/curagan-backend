import {
  Injectable,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreatePatientDto, LoginPatient } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { JwtService, JwtSignOptions } from '@nestjs/jwt/dist';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { ChangePassword } from './dto/update-patient.dto';
import { Request } from 'express';

@Injectable()
export class PatientService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  private async generateToken(data: CreatePatientDto) {
    const payload = {
      sub: data.id,
      name: data.name,
      email: data.email,
      role: 'patient',
    };
    const options: JwtSignOptions = {
      secret: process.env.JWT_KEY,
      expiresIn: '24h',
      algorithm: 'HS256',
    };
    const token = await this.jwtService.signAsync(payload, options);
    return token;
  }

  async register(registerDto: CreatePatientDto) {
    const isExist = await this.prismaService.patient.findFirst({
      where: {
        email: registerDto.email,
      },
    });
    if (isExist) {
      throw new ConflictException();
    }
    const newUser = await this.prismaService.patient.create({
      data: {
        ...registerDto,
        password: bcrypt.hashSync(
          registerDto.password,
          Number(process.env['HASH_SALT']),
        ),
      },
    });
    newUser.password = undefined;
    return newUser;
  }

  async login(loginDto: LoginPatient) {
    const response = await this.prismaService.patient.findFirst({
      where: {
        email: loginDto.email,
      },
    });
    if (!response) {
      throw new NotFoundException();
    }
    const isMatch = await bcrypt.compare(loginDto.password, response.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    response.password = undefined;
    const token = await this.generateToken(response);
    return {
      id: response.id,
      role: 'patient',
      access_token: token,
    };
  }

  async getAllPatients() {
    const response = await this.prismaService.patient.findMany();
    response.map((res) => {
      res.password = undefined;
    });
    return response;
  }

  async getPatientById(id: string) {
    const patient = await this.prismaService.patient.findUnique({
      where: { id },
    });
    if (!patient) {
      throw new NotFoundException();
    }
    patient.password = undefined;
    return patient;
  }

  async updatePatient(id: string, updatePatientDto: UpdatePatientDto) {
    const patient = await this.prismaService.patient.findUnique({
      where: { id },
    });
    const updatedData: UpdatePatientDto = {
      id: patient.id,
      password: patient.password,
      name: updatePatientDto.name || patient.name,
      email: updatePatientDto.email || patient.email,
      imageURL: updatePatientDto.imageURL || patient.imageURL,
    };
    if (!patient) {
      throw new NotFoundException('Patient not found!');
    }
    const updatedPatient = await this.prismaService.patient.update({
      where: { id },
      data: updatedData,
    });
    updatedPatient.password = undefined;
    return updatedPatient;
  }

  async deletePatient(id: string) {
    const patient = await this.prismaService.patient.findUnique({
      where: { id },
    });
    if (!patient) {
      throw new NotFoundException('Patient not found!');
    }
    await this.prismaService.patient.delete({
      where: { id },
    });
  }

  async changePassword(id: string, data: ChangePassword, req: Request) {
    const response = await this.prismaService.patient.findFirst({
      where: {
        id: id,
      },
    });
    const isMatch = bcrypt.compareSync(data.oldPassword, response.password);
    if (!isMatch) {
      throw new UnauthorizedException('wrong password');
    }
    if (id !== req['user'].sub) {
      throw new UnauthorizedException('unmatched user');
    }
    const changed = await this.prismaService.patient.update({
      where: {
        id: id,
      },
      data: {
        password: bcrypt.hashSync(
          data.newPassword,
          Number(process.env['HASH_SALT']),
        ),
      },
    });
    changed.password = undefined;
    return changed;
  }
}

import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import {
  CreateDoctorDto,
  DoctorDto,
  LoginDto,
  SearchDoctor,
} from './dto/create-doctor.dto';
import { ChangePassword, UpdateDoctorDto } from './dto/update-doctor.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtSignOptions, JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class DoctorService {
  constructor(
    private readonly prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  private async generateToken(data: DoctorDto) {
    const payload = {
      sub: data.id,
      name: data.name,
      email: data.email,
      role: 'doctor',
    };
    const options: JwtSignOptions = {
      secret: process.env.JWT_KEY,
      expiresIn: '24h',
      algorithm: 'HS256',
    };
    const token = await this.jwtService.signAsync(payload, options);
    return token;
  }

  // AUTH API
  async login(loginDto: LoginDto, req: Request) {
    const response = await this.prismaService.doctor.findFirst({
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
    req['role'] = 'doctor';
    return {
      id: response.id,
      role: 'doctor',
      access_token: token,
    };
  }

  async register(createDoctorDto: CreateDoctorDto) {
    const isExist = await this.prismaService.doctor.findFirst({
      where: {
        email: createDoctorDto.email,
      },
    });
    if (isExist) {
      throw new ConflictException();
    }
    const scheduleJSON = JSON.stringify(createDoctorDto.schedule);
    const newDoctor = await this.prismaService.doctor.create({
      data: {
        ...createDoctorDto,
        schedule: scheduleJSON,
        password: bcrypt.hashSync(
          createDoctorDto.password,
          Number(process.env['HASH_SALT']),
        ),
      },
    });
    newDoctor.password = undefined;
    return newDoctor;
  }

  // BASIC CRUD

  async getAllDoctor() {
    const response = await this.prismaService.doctor.findMany();
    response.map((res) => {
      res.password = undefined;
    });
    return response;
  }

  async getDoctorById(id: string) {
    const doctor = await this.prismaService.doctor.findUnique({
      where: { id: id },
    });
    if (!doctor) {
      throw new NotFoundException();
    }
    doctor.password = undefined;
    return doctor;
  }

  async updateDoctor(id: string, updateDoctorDto: UpdateDoctorDto) {
    const doctor = await this.prismaService.doctor.findUnique({
      where: { id: id },
    });
    const updatedData = {
      email: updateDoctorDto.email || doctor.email,
      name: updateDoctorDto.name || doctor.name,
      imageUrl: updateDoctorDto.imageURL || doctor.imageURL,
      hospital: updateDoctorDto.hospital || doctor.hospital,
      schedule: JSON.stringify([updateDoctorDto.schedule]) || doctor.schedule,
    };
    if (!doctor) {
      throw new NotFoundException();
    }
    const updatedDoctor = await this.prismaService.doctor.update({
      where: { id: id },
      data: updatedData,
    });
    updatedDoctor.password = undefined;
    return updatedDoctor;
  }

  async deleteDoctor(id: string, req: Request) {
    const doctor = await this.prismaService.doctor.findUnique({
      where: { id },
    });
    if (!doctor) {
      throw new NotFoundException();
    }
    if (id !== req['user'].sub) {
      throw new UnauthorizedException();
    }
    await this.prismaService.doctor.delete({
      where: { id },
    });
  }

  async searchDoctor(data: SearchDoctor) {
    const response = await this.prismaService.doctor.findMany({
      where: {
        OR: [
          {
            name: {
              contains: String(data.name).toLowerCase(),
            },
          },
          {
            location: {
              contains: String(data.location).toLowerCase(),
            },
          },
          {
            hospital: {
              contains: String(data.hospital).toLowerCase(),
            },
          },
        ],
      },
    });
    if (!response) {
      throw new NotFoundException();
    }
    return response;
  }

  async changePassword(id: string, data: ChangePassword, req: Request) {
    const response = await this.prismaService.doctor.findFirst({
      where: {
        id: id,
      },
    });
    const isMatch = bcrypt.compareSync(data.oldPassword, response.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    if (id !== req['user'].sub) {
      throw new UnauthorizedException();
    }
    const changed = await this.prismaService.doctor.update({
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

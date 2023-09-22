import {
  Injectable,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreatePatientDto, LoginPatient } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { JwtService, JwtSignOptions } from '@nestjs/jwt/dist';
import { PrismaService } from '../prisma/prisma.service'
import * as bcrypt from 'bcrypt';

@Injectable()
export class PatientService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) { }

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
    const options: JwtSignOptions = {
      secret: process.env['JWT_KEY'],
      expiresIn: '24h',
      algorithm: 'HS256',
    };
    return {
      response: response.id,
      access_token: await this.jwtService.signAsync(response, options),
    };
  }

  async getAllPatients() {
    const response = await this.prismaService.patient.findMany();
    response.map((res) => {
      res.password = undefined;
    });
    return response;
  }
}

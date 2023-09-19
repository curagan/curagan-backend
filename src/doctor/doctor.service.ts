import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { CreateDoctorDto, LoginDto } from './dto/create-doctor.dto';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtSignOptions, JwtService } from '@nestjs/jwt';

@Injectable()
export class DoctorService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
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
    const options: JwtSignOptions = {
      secret: process.env['JWT_KEY'],
      expiresIn: '24h',
      algorithm: 'HS256',
    };
    return {
      response: response,
      access_token: await this.jwtService.signAsync(response, options),
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

  async getAllDoctor() {
    return await this.prismaService.doctor.findMany();
  }
}

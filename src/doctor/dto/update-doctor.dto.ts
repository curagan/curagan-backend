import { PartialType } from '@nestjs/mapped-types';
import { CreateDoctorDto } from './create-doctor.dto';
import { isString } from 'class-validator';

export class UpdateDoctorDto extends PartialType(CreateDoctorDto) {
  id: string | undefined;
  email: string | undefined;
  name: string | undefined;
  imageURL: string | undefined;
  location: string | undefined;
  hospital: string | undefined;
  schedule: Schedule[] | undefined;
}
interface Schedule {
  days: string;
  time: number[];
}

export class ChangePassword {
  oldPassword: string;
  newPassword: string;
}

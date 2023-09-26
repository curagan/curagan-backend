import { PartialType } from '@nestjs/mapped-types';
import { CreatePatientDto } from './create-patient.dto';

export class UpdatePatientDto extends PartialType(CreatePatientDto) {
  id: string | undefined;
  email: string | undefined;
  password: string | undefined;
  name: string | undefined;
  imageURL: string | undefined;
}

export class ChangePassword {
  oldPassword: string;
  newPassword: string;
}

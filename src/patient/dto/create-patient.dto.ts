export class CreatePatientDto {
  id: string;
  email: string;
  password: string;
  name: string;
  imageURL: string;
}

export class LoginPatient {
  email: string;
  password: string;
}

enum Specialization {
  Umum = 'Umum',
  Jantung = 'Jantung',
  Kulit = 'Kulit',
  Lambung = 'Lambung',
  Darah = 'Darah',
  Penyakit_Menular = 'Penyakit_Menular',
  Ginjal = 'Ginjal',
  Saraf = 'Saraf',
  Kandungan = 'Kandungan',
  Kanker = 'Kanker',
  Mata = 'Mata',
  Tulang = 'Tulang',
  THT = 'THT',
  Anak = 'Anak',
  Jiwa = 'Jiwa',
  Paru_Paru = 'Paru_Paru',
  Radiologi = 'Radiologi',
  Rematologi = 'Rematologi',
  Urologi = 'Urologi',
  Bedah_Umum = 'Bedah_Umum',
}

export class CreateDoctorDto {
  id: string;
  email: string;
  specialization: Specialization;
  password: string;
  name: string;
  imageURL: string;
  loc: string;
  hospital: string;
  schedule: Schedule[];
}
interface Schedule {
  days: string;
  time: number[];
}

export class LoginDto {
  email: string;
  password: string;
}

import { PartialType } from '@nestjs/swagger';
import { CreateAppointmentDto } from './create-appointment.dto';

export class UpdateAppoinmentDto extends PartialType(CreateAppointmentDto) { }

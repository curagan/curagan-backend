import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppoinmentDto } from './dto/update-appointment.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AppointmentsService {
  constructor(private prisma: PrismaService) { }

  async create(createAppointmentDto: CreateAppointmentDto) {
    const { patientId, doctorId, datetime, status } = createAppointmentDto;

    return this.prisma.appointmentPatientDoctor.create({
      data: {
        patient: { connect: { id: patientId } },
        doctor: { connect: { id: doctorId } },
        datetime,
        status,
      },
    });
  }

  async findAll() {
    return this.prisma.appointmentPatientDoctor.findMany();
  }

  async findOne(appointmentId: string) {
    const appointment = await this.prisma.appointmentPatientDoctor.findUnique({
      where: { appointmentId },
    });

    if (!appointment) {
      throw new NotFoundException(`Appointment with ID ${appointmentId} not found`);
    }

    return appointment;
  }

  async update(appointmentId: string, UpdateAppoinmentDto: UpdateAppoinmentDto) {
    const appointment = await this.prisma.appointmentPatientDoctor.findUnique({
      where: { appointmentId },
    })

    if (!appointment) {
      throw new NotFoundException(`No appointment was found with the specified ID: ${appointmentId}.`)
    }

    const updatedAppoinment = await this.prisma.appointmentPatientDoctor.update({
      where: { appointmentId },
      data: {
        status: UpdateAppoinmentDto.status
      }
    })
    return updatedAppoinment
  }

}

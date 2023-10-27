import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AppointmentsService {
  constructor(private prisma: PrismaService) {}

  async create(createAppointmentDto: CreateAppointmentDto) {
    const { patientID, doctorID, datetime } = createAppointmentDto;

    // When creating a new appointment, set the status to 'Pending' by default.
    return this.prisma.appointmentPatientDoctor.create({
      data: {
        patient: { connect: { id: patientID } },
        doctor: { connect: { id: doctorID } },
        datetime,
        status: 'Pending',
      },
    });
  }

  // async findPatientAppointments(patientID: string) {
  //   return await this.prisma.appointmentPatientDoctor.findMany({
  //     where: {
  //       patientID: patientID
  //     }
  //   });
  // }

  async findAppointments(id: string) {
    return await this.prisma.appointmentPatientDoctor.findMany({
      where: {
        OR: [
          {
            doctorID: id,
          },
          {
            patientID: id,
          },
        ],
      },
    });
  }

  async findOne(appointmentId: string) {
    const appointment = await this.prisma.appointmentPatientDoctor.findUnique({
      where: { appointmentId },
    });

    if (!appointment) {
      throw new NotFoundException(
        `Appointment with ID ${appointmentId} not found`,
      );
    }

    return appointment;
  }

  async update(
    appointmentId: string,
    UpdateAppointmentDto: UpdateAppointmentDto,
  ) {
    const { status, rejectionReason } = UpdateAppointmentDto;
    const appointment = await this.prisma.appointmentPatientDoctor.findUnique({
      where: { appointmentId },
    });

    if (!appointment) {
      throw new NotFoundException(
        `No appointment was found with the specified ID: ${appointmentId}.`,
      );
    };
    if (status === 'Accepted') {
      appointment.status = 'Accepted';
    } else if (status === 'Rejected') {
      if (!rejectionReason) {
      throw new Error('Rejection reason is required when rejecting the appointment.');
      };
    };

    const updatedAppointment =
      await this.prisma.appointmentPatientDoctor.update({
        where: { appointmentId },
        data: {
          status: UpdateAppointmentDto.status,
          rejectionReason: appointment.rejectionReason,
        },
      });

    return updatedAppointment;
  }

  async getHistory(startDate: string, endDate: string, id: string) {
    const response = await this.prisma.appointmentPatientDoctor.findMany({
      where: {
        doctorID: id,
        datetime: {
          lte: new Date(endDate),
          gte: new Date(startDate),
        },
      },
    });
    return response;
  }
}

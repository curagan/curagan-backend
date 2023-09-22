export class CreateAppointmentDto {
    patientId: string;
    doctorId: string;
    datetime: Date;
    status: 'Pending' | 'Submitted' | 'Accepted' | 'Rejected' | 'Done';
}

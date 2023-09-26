export class CreateAppointmentDto {
    patientID: string;
    doctorID: string;
    datetime: Date;
    status: 'Pending' | 'Submitted' | 'Accepted' | 'Rejected' | 'Done';
}

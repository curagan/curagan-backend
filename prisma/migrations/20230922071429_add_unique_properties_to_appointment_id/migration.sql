/*
  Warnings:

  - A unique constraint covering the columns `[appointmentId]` on the table `AppointmentPatientDoctor` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "AppointmentPatientDoctor_appointmentId_key" ON "AppointmentPatientDoctor"("appointmentId");

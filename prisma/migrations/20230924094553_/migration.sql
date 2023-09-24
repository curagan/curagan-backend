/*
  Warnings:

  - The primary key for the `AppointmentPatientDoctor` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropIndex
DROP INDEX "AppointmentPatientDoctor_appointmentId_key";

-- AlterTable
ALTER TABLE "AppointmentPatientDoctor" DROP CONSTRAINT "AppointmentPatientDoctor_pkey",
ADD CONSTRAINT "AppointmentPatientDoctor_pkey" PRIMARY KEY ("appointmentId");

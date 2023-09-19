-- CreateEnum
CREATE TYPE "Specialization" AS ENUM ('Umum', 'Jantung', 'Kulit', 'Lambung', 'Darah');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Pending', 'Submitted', 'Accepted', 'Rejected', 'Done');

-- CreateTable
CREATE TABLE "Patient" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "imageURL" TEXT NOT NULL,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Doctor" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "spesialisasi" "Specialization" NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "imageURL" TEXT NOT NULL,

    CONSTRAINT "Doctor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AppointmentPatientDoctor" (
    "patientID" TEXT NOT NULL,
    "doctorID" TEXT NOT NULL,
    "datetime" TIMESTAMP(3) NOT NULL,
    "status" "Status" NOT NULL,

    CONSTRAINT "AppointmentPatientDoctor_pkey" PRIMARY KEY ("patientID","doctorID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Patient_email_key" ON "Patient"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Doctor_email_key" ON "Doctor"("email");

-- AddForeignKey
ALTER TABLE "AppointmentPatientDoctor" ADD CONSTRAINT "AppointmentPatientDoctor_patientID_fkey" FOREIGN KEY ("patientID") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppointmentPatientDoctor" ADD CONSTRAINT "AppointmentPatientDoctor_doctorID_fkey" FOREIGN KEY ("doctorID") REFERENCES "Doctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

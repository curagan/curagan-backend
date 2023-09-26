-- CreateEnum
CREATE TYPE "Specialization" AS ENUM ('Umum', 'Jantung', 'Kulit', 'Lambung', 'Darah', 'Penyakit_Menular', 'Ginjal', 'Saraf', 'Kandungan', 'Kanker', 'Mata', 'Tulang', 'THT', 'Anak', 'Jiwa', 'Paru_Paru', 'Radiologi', 'Rematologi', 'Urologi', 'Bedah_Umum');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Pending', 'Submitted', 'Accepted', 'Rejected', 'Done');

-- CreateTable
CREATE TABLE "Patient" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imageURL" TEXT NOT NULL,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Doctor" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "specialization" TEXT NOT NULL DEFAULT 'Umum',
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imageURL" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "hospital" TEXT NOT NULL,
    "schedule" TEXT,

    CONSTRAINT "Doctor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AppointmentPatientDoctor" (
    "appointmentId" TEXT NOT NULL,
    "patientID" TEXT,
    "doctorID" TEXT,
    "datetime" TIMESTAMP(3) NOT NULL,
    "status" "Status" NOT NULL,

    CONSTRAINT "AppointmentPatientDoctor_pkey" PRIMARY KEY ("appointmentId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Patient_email_key" ON "Patient"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Doctor_email_key" ON "Doctor"("email");

-- AddForeignKey
ALTER TABLE "AppointmentPatientDoctor" ADD CONSTRAINT "AppointmentPatientDoctor_patientID_fkey" FOREIGN KEY ("patientID") REFERENCES "Patient"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppointmentPatientDoctor" ADD CONSTRAINT "AppointmentPatientDoctor_doctorID_fkey" FOREIGN KEY ("doctorID") REFERENCES "Doctor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

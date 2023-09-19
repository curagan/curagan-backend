/*
  Warnings:

  - You are about to drop the column `firstName` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `spesialisasi` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Patient` table. All the data in the column will be lost.
  - Added the required column `hospital` to the `Doctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `loc` to the `Doctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Doctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `schedule` to the `Doctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `specialization` to the `Doctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Patient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Specialization" ADD VALUE 'Penyakit_Menular';
ALTER TYPE "Specialization" ADD VALUE 'Ginjal';
ALTER TYPE "Specialization" ADD VALUE 'Saraf';
ALTER TYPE "Specialization" ADD VALUE 'Kandungan';
ALTER TYPE "Specialization" ADD VALUE 'Kanker';
ALTER TYPE "Specialization" ADD VALUE 'Mata';
ALTER TYPE "Specialization" ADD VALUE 'Tulang';
ALTER TYPE "Specialization" ADD VALUE 'THT';
ALTER TYPE "Specialization" ADD VALUE 'Anak';
ALTER TYPE "Specialization" ADD VALUE 'Jiwa';
ALTER TYPE "Specialization" ADD VALUE 'Paru_Paru';
ALTER TYPE "Specialization" ADD VALUE 'Radiologi';
ALTER TYPE "Specialization" ADD VALUE 'Rematologi';
ALTER TYPE "Specialization" ADD VALUE 'Urologi';
ALTER TYPE "Specialization" ADD VALUE 'Bedah_Umum';

-- AlterTable
ALTER TABLE "Doctor" DROP COLUMN "firstName",
DROP COLUMN "lastName",
DROP COLUMN "spesialisasi",
ADD COLUMN     "hospital" TEXT NOT NULL,
ADD COLUMN     "loc" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "schedule" TEXT NOT NULL,
ADD COLUMN     "specialization" "Specialization" NOT NULL;

-- AlterTable
ALTER TABLE "Patient" DROP COLUMN "firstName",
DROP COLUMN "lastName",
ADD COLUMN     "name" TEXT NOT NULL;

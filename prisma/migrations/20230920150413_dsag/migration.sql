/*
  Warnings:

  - The `specialization` column on the `Doctor` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Doctor" DROP COLUMN "specialization",
ADD COLUMN     "specialization" TEXT NOT NULL DEFAULT 'Umum';

/*
  Warnings:

  - You are about to drop the column `loc` on the `Doctor` table. All the data in the column will be lost.
  - Added the required column `location` to the `Doctor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Doctor" DROP COLUMN "loc",
ADD COLUMN     "location" TEXT NOT NULL;

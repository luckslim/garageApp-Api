/*
  Warnings:

  - Made the column `typeVehicle` on table `check_in` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "check_in" ALTER COLUMN "typeVehicle" SET NOT NULL;

-- CreateEnum
CREATE TYPE "typeVehicle" AS ENUM ('Moto', 'Car');

-- AlterTable
ALTER TABLE "check_in" ADD COLUMN     "photoVehicle" TEXT,
ADD COLUMN     "typeVehicle" "typeVehicle";

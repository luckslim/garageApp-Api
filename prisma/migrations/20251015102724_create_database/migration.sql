-- CreateEnum
CREATE TYPE "typeVehicle" AS ENUM ('Moto', 'Car');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "check_in" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "typeVehicle" "typeVehicle" NOT NULL,
    "photoVehicle" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "checkOut" TIMESTAMP(3),

    CONSTRAINT "check_in_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "check_in" ADD CONSTRAINT "check_in_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

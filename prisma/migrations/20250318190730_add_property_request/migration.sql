/*
  Warnings:

  - Added the required column `city` to the `Property` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- AlterTable
ALTER TABLE "Owner" ALTER COLUMN "contactNumber" SET DATA TYPE BIGINT,
ALTER COLUMN "adharNumber" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "Property" ADD COLUMN     "city" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Tenant" ALTER COLUMN "tenantStatus" DROP NOT NULL,
ALTER COLUMN "tenantStatus" DROP DEFAULT;

-- CreateTable
CREATE TABLE "PropertyRequest" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "status" "RequestStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PropertyRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PropertyRequest_tenantId_propertyId_key" ON "PropertyRequest"("tenantId", "propertyId");

-- AddForeignKey
ALTER TABLE "PropertyRequest" ADD CONSTRAINT "PropertyRequest_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PropertyRequest" ADD CONSTRAINT "PropertyRequest_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

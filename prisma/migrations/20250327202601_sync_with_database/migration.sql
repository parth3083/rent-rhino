/*
  Warnings:

  - A unique constraint covering the columns `[tenantId,propertyId,id]` on the table `PropertyRequest` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ownerId` to the `Maintainence_Support` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "PropertyRequest_tenantId_propertyId_key";

-- AlterTable
ALTER TABLE "Maintainence_Support" ADD COLUMN     "ownerId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PropertyRequest" ALTER COLUMN "status" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "PropertyRequest_tenantId_propertyId_id_key" ON "PropertyRequest"("tenantId", "propertyId", "id");

-- AddForeignKey
ALTER TABLE "Maintainence_Support" ADD CONSTRAINT "Maintainence_Support_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Owner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

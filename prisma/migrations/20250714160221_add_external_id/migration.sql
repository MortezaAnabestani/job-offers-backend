/*
  Warnings:

  - A unique constraint covering the columns `[externalId,source]` on the table `JobOffer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `externalId` to the `JobOffer` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "JobOffer_title_company_location_postedAt_source_key";

-- AlterTable
ALTER TABLE "JobOffer" ADD COLUMN     "externalId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "JobOffer_externalId_source_key" ON "JobOffer"("externalId", "source");

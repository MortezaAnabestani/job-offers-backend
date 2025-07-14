/*
  Warnings:

  - A unique constraint covering the columns `[title,company,location,postedAt,source]` on the table `JobOffer` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "JobOffer_title_company_location_postedAt_key";

-- CreateIndex
CREATE UNIQUE INDEX "JobOffer_title_company_location_postedAt_source_key" ON "JobOffer"("title", "company", "location", "postedAt", "source");

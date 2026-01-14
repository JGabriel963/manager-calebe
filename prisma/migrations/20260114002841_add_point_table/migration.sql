/*
  Warnings:

  - You are about to drop the column `score` on the `checkins` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "PointType" AS ENUM ('CHECKIN', 'MANUAL', 'BONUS', 'PENALTY');

-- AlterTable
ALTER TABLE "checkins" DROP COLUMN "score";

-- CreateTable
CREATE TABLE "point_transactions" (
    "id" TEXT NOT NULL,
    "personId" TEXT NOT NULL,
    "checkinId" TEXT,
    "points" INTEGER NOT NULL,
    "reason" TEXT,
    "type" "PointType" NOT NULL DEFAULT 'MANUAL',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "point_transactions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "point_transactions_checkinId_key" ON "point_transactions"("checkinId");

-- AddForeignKey
ALTER TABLE "point_transactions" ADD CONSTRAINT "point_transactions_personId_fkey" FOREIGN KEY ("personId") REFERENCES "persons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "point_transactions" ADD CONSTRAINT "point_transactions_checkinId_fkey" FOREIGN KEY ("checkinId") REFERENCES "checkins"("id") ON DELETE SET NULL ON UPDATE CASCADE;

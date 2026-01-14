-- DropForeignKey
ALTER TABLE "point_transactions" DROP CONSTRAINT "point_transactions_checkinId_fkey";

-- AddForeignKey
ALTER TABLE "point_transactions" ADD CONSTRAINT "point_transactions_checkinId_fkey" FOREIGN KEY ("checkinId") REFERENCES "checkins"("id") ON DELETE CASCADE ON UPDATE CASCADE;

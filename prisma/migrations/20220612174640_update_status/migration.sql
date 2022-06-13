/*
  Warnings:

  - You are about to drop the column `probability_name` on the `status` table. All the data in the column will be lost.
  - Added the required column `status_name` to the `status` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "status" DROP COLUMN "probability_name",
ADD COLUMN     "status_name" TEXT NOT NULL;

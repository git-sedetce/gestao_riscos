/*
  Warnings:

  - You are about to drop the column `types_tretament_name` on the `tipos_tratamento` table. All the data in the column will be lost.
  - Added the required column `types_treatment_name` to the `tipos_tratamento` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tipos_tratamento" DROP COLUMN "types_tretament_name",
ADD COLUMN     "types_treatment_name" TEXT NOT NULL;

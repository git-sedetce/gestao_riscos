/*
  Warnings:

  - You are about to drop the column `id_classification` on the `riscos` table. All the data in the column will be lost.
  - You are about to drop the column `inherement_risk` on the `riscos` table. All the data in the column will be lost.
  - Added the required column `inherent_risk` to the `riscos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "riscos" DROP CONSTRAINT "riscos_id_classification_fkey";

-- AlterTable
ALTER TABLE "riscos" DROP COLUMN "id_classification",
DROP COLUMN "inherement_risk",
ADD COLUMN     "classificacoesId" INTEGER,
ADD COLUMN     "inherent_risk" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "riscos" ADD CONSTRAINT "riscos_classificacoesId_fkey" FOREIGN KEY ("classificacoesId") REFERENCES "classificacoes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `quantity` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `tconst` on the `Order` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_tconst_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "quantity",
DROP COLUMN "tconst",
ADD COLUMN     "movies" TEXT[];

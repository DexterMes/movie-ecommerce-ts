/*
  Warnings:

  - The primary key for the `TitleAkas` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `types` column on the `TitleAkas` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `attributes` column on the `TitleAkas` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "TitleAkas" DROP CONSTRAINT "TitleAkas_pkey",
DROP COLUMN "types",
ADD COLUMN     "types" TEXT[],
DROP COLUMN "attributes",
ADD COLUMN     "attributes" TEXT[],
ADD CONSTRAINT "TitleAkas_pkey" PRIMARY KEY ("ordering", "titleId");

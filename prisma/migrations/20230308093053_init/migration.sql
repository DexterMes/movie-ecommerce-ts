/*
  Warnings:

  - The primary key for the `Principals` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `characters` column on the `Principals` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Principals" DROP CONSTRAINT "Principals_pkey",
DROP COLUMN "characters",
ADD COLUMN     "characters" TEXT[],
ADD CONSTRAINT "Principals_pkey" PRIMARY KEY ("tconst", "nconst");

-- AlterTable
ALTER TABLE "TitleAkas" ALTER COLUMN "types" SET NOT NULL,
ALTER COLUMN "types" SET DATA TYPE TEXT,
ALTER COLUMN "attributes" SET NOT NULL,
ALTER COLUMN "attributes" SET DATA TYPE TEXT;

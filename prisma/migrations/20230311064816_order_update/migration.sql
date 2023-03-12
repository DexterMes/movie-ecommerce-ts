/*
  Warnings:

  - You are about to drop the `Cart` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Cart";

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_tconst_fkey" FOREIGN KEY ("tconst") REFERENCES "Movie"("tconst") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_username_fkey" FOREIGN KEY ("username") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

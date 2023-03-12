-- CreateEnum
CREATE TYPE "Role" AS ENUM ('CUSTOMER', 'ADMIN');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Initiated', 'Process', 'Shipped');

-- CreateTable
CREATE TABLE "User" (
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "cart" TEXT[],

    CONSTRAINT "User_pkey" PRIMARY KEY ("username")
);

-- CreateTable
CREATE TABLE "Cart" (
    "username" TEXT NOT NULL,
    "tconst" TEXT NOT NULL,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("username")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "tconst" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'Initiated',

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

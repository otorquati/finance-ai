/*
  Warnings:

  - Added the required column `userId` to the `Trannsaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Trannsaction" ADD COLUMN     "userId" TEXT NOT NULL;

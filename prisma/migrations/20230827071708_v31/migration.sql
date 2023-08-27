/*
  Warnings:

  - You are about to drop the `activeconnection` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `lastSeenAt` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Active', 'InActive');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "connectionId" TEXT[],
ADD COLUMN     "lastSeenAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'InActive';

-- DropTable
DROP TABLE "activeconnection";

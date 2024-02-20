/*
  Warnings:

  - Added the required column `purchase_id` to the `purchase_history` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "payment_statuses" AS ENUM ('intent_created', 'succeed', 'failed', 'cancel');

-- AlterTable
ALTER TABLE "purchase_history" ADD COLUMN     "purchase_id" TEXT NOT NULL,
ADD COLUMN     "status" "payment_statuses" NOT NULL DEFAULT 'intent_created';

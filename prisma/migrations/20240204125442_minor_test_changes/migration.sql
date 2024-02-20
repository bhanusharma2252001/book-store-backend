/*
  Warnings:

  - The primary key for the `book` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `role` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[book_id]` on the table `rating` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[book_id]` on the table `review` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "purchase_history" DROP CONSTRAINT "purchase_history_book_id_fkey";

-- DropForeignKey
ALTER TABLE "purchase_history" DROP CONSTRAINT "purchase_history_user_id_fkey";

-- DropForeignKey
ALTER TABLE "rating" DROP CONSTRAINT "rating_user_id_fkey";

-- DropForeignKey
ALTER TABLE "review" DROP CONSTRAINT "review_user_id_fkey";

-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_role_id_fkey";

-- AlterTable
ALTER TABLE "book" DROP CONSTRAINT "book_pkey",
ADD COLUMN     "reviewId" INTEGER,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "book_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "book_id_seq";

-- AlterTable
ALTER TABLE "purchase_history" ALTER COLUMN "book_id" SET DATA TYPE TEXT,
ALTER COLUMN "user_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "rating" ALTER COLUMN "book_id" SET DATA TYPE TEXT,
ALTER COLUMN "user_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "review" ALTER COLUMN "book_id" SET DATA TYPE TEXT,
ALTER COLUMN "user_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "role" DROP CONSTRAINT "role_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "role_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "role_id_seq";

-- AlterTable
ALTER TABLE "user" DROP CONSTRAINT "user_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "role_id" DROP NOT NULL,
ALTER COLUMN "role_id" SET DATA TYPE TEXT,
ALTER COLUMN "first_name" DROP NOT NULL,
ALTER COLUMN "username" DROP NOT NULL,
ALTER COLUMN "password" DROP NOT NULL,
ADD CONSTRAINT "user_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "user_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "rating_book_id_key" ON "rating"("book_id");

-- CreateIndex
CREATE UNIQUE INDEX "review_book_id_key" ON "review"("book_id");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "book" ADD CONSTRAINT "book_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "review"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchase_history" ADD CONSTRAINT "purchase_history_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchase_history" ADD CONSTRAINT "purchase_history_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rating" ADD CONSTRAINT "rating_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rating" ADD CONSTRAINT "rating_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

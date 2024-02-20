-- CreateTable
CREATE TABLE "user_book" (
    "userId" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_book_pkey" PRIMARY KEY ("userId","bookId")
);

-- AddForeignKey
ALTER TABLE "user_book" ADD CONSTRAINT "user_book_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_book" ADD CONSTRAINT "user_book_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

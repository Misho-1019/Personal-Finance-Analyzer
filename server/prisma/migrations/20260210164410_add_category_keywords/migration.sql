-- CreateTable
CREATE TABLE "CategoryKeyword" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "keyword" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CategoryKeyword_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CategoryKeyword_userId_idx" ON "CategoryKeyword"("userId");

-- CreateIndex
CREATE INDEX "CategoryKeyword_categoryId_idx" ON "CategoryKeyword"("categoryId");

-- CreateIndex
CREATE UNIQUE INDEX "CategoryKeyword_userId_keyword_key" ON "CategoryKeyword"("userId", "keyword");

-- AddForeignKey
ALTER TABLE "CategoryKeyword" ADD CONSTRAINT "CategoryKeyword_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryKeyword" ADD CONSTRAINT "CategoryKeyword_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

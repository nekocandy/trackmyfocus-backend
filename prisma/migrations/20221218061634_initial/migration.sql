-- CreateTable
CREATE TABLE "Sessions" (
    "id" STRING NOT NULL,
    "session" STRING NOT NULL,
    "email" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "completedAt" TIMESTAMP,

    CONSTRAINT "Sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Focus" (
    "id" STRING NOT NULL,
    "sessionId" STRING NOT NULL,
    "email" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Focus_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Focus" ADD CONSTRAINT "Focus_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Sessions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

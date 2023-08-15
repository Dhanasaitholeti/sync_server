-- CreateTable
CREATE TABLE "activeconnections" (
    "id" TEXT NOT NULL,
    "connectionid" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "activeconnections_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "activeconnections" ADD CONSTRAINT "activeconnections_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

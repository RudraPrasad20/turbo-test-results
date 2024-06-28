-- CreateTable
CREATE TABLE "Roland" (
    "id" SERIAL NOT NULL,
    "studentName" TEXT NOT NULL,
    "rollNo" TEXT NOT NULL,
    "sgpa" TEXT NOT NULL,
    "branch" TEXT NOT NULL,
    "subjects" TEXT[],

    CONSTRAINT "Roland_pkey" PRIMARY KEY ("id")
);

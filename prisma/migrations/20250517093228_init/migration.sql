-- CreateTable
CREATE TABLE "FitnessData" (
    "id" SERIAL NOT NULL,
    "date" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "pushUp" INTEGER NOT NULL,
    "plank" INTEGER NOT NULL,
    "squat" INTEGER NOT NULL,
    "abs" INTEGER NOT NULL,

    CONSTRAINT "FitnessData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

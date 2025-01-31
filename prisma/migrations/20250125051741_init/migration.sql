-- CreateTable
CREATE TABLE "FitnessData" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pushUps" INTEGER NOT NULL,
    "squats" INTEGER NOT NULL,
    "plankSec" INTEGER NOT NULL,
    "abs" INTEGER NOT NULL DEFAULT 0
);

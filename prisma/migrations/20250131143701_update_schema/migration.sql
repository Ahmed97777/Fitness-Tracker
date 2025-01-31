/*
  Warnings:

  - You are about to drop the column `plankSec` on the `FitnessData` table. All the data in the column will be lost.
  - You are about to drop the column `pushUps` on the `FitnessData` table. All the data in the column will be lost.
  - You are about to drop the column `squats` on the `FitnessData` table. All the data in the column will be lost.
  - Added the required column `name` to the `FitnessData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `plank` to the `FitnessData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pushUp` to the `FitnessData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `squat` to the `FitnessData` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FitnessData" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "pushUp" INTEGER NOT NULL,
    "plank" INTEGER NOT NULL,
    "squat" INTEGER NOT NULL,
    "abs" INTEGER NOT NULL
);
INSERT INTO "new_FitnessData" ("abs", "date", "id") SELECT "abs", "date", "id" FROM "FitnessData";
DROP TABLE "FitnessData";
ALTER TABLE "new_FitnessData" RENAME TO "FitnessData";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

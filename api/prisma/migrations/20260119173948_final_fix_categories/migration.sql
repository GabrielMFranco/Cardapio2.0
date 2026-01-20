/*
  Warnings:

  - You are about to drop the column `composition` on the `drinks` table. All the data in the column will be lost.
  - Added the required column `categories` to the `drinks` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_drinks" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "ingredients" TEXT NOT NULL,
    "categories" TEXT NOT NULL
);
INSERT INTO "new_drinks" ("id", "img", "ingredients", "name") SELECT "id", "img", "ingredients", "name" FROM "drinks";
DROP TABLE "drinks";
ALTER TABLE "new_drinks" RENAME TO "drinks";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

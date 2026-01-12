-- CreateTable
CREATE TABLE "drinks" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "ingredients" TEXT NOT NULL,
    "composition" TEXT NOT NULL DEFAULT 'OTHERS'
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'CUSTOMER'
);
INSERT INTO "new_users" ("id", "password", "role", "user") SELECT "id", "password", "role", "user" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_user_key" ON "users"("user");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

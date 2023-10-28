-- CreateTable
CREATE TABLE "UserCredential" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userid" INTEGER NOT NULL,
    "chula" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    CONSTRAINT "UserCredential_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Payhist" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fromUser" INTEGER NOT NULL,
    "toUser" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "hash" TEXT NOT NULL DEFAULT '',
    CONSTRAINT "Payhist_fromUser_fkey" FOREIGN KEY ("fromUser") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Payhist_toUser_fkey" FOREIGN KEY ("toUser") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Payhist" ("amount", "fromUser", "id", "toUser") SELECT "amount", "fromUser", "id", "toUser" FROM "Payhist";
DROP TABLE "Payhist";
ALTER TABLE "new_Payhist" RENAME TO "Payhist";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "UserCredential_userid_key" ON "UserCredential"("userid");

-- CreateIndex
CREATE UNIQUE INDEX "UserCredential_chula_key" ON "UserCredential"("chula");

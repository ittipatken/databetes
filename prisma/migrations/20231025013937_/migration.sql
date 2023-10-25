/*
  Warnings:

  - The primary key for the `Product` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `pid` on the `Product` table. All the data in the column will be lost.
  - Added the required column `id` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productid` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_id_key";

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "productid" INTEGER NOT NULL,
    "name" TEXT,
    "price" INTEGER,
    "description" TEXT,
    "quantity" INTEGER,
    CONSTRAINT "Product_productid_fkey" FOREIGN KEY ("productid") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Product" ("description", "name", "price", "quantity") SELECT "description", "name", "price", "quantity" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE UNIQUE INDEX "Product_productid_key" ON "Product"("productid");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

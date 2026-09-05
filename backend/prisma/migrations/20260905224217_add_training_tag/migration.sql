/*
  Warnings:

  - Added the required column `tag` to the `Training` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "tag" AS ENUM ('push', 'pull', 'legs', 'full', 'core', 'hit');

-- AlterTable
ALTER TABLE "Training" ADD COLUMN     "tag" "tag" NOT NULL;

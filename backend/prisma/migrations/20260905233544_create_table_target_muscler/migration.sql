/*
  Warnings:

  - You are about to drop the column `TargetMuscles` on the `Training` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Training" DROP COLUMN "TargetMuscles";

-- CreateTable
CREATE TABLE "TargetMuscles" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TargetMuscles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_TargetMusclesToTraining" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_TargetMusclesToTraining_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_TargetMusclesToTraining_B_index" ON "_TargetMusclesToTraining"("B");

-- AddForeignKey
ALTER TABLE "_TargetMusclesToTraining" ADD CONSTRAINT "_TargetMusclesToTraining_A_fkey" FOREIGN KEY ("A") REFERENCES "TargetMuscles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TargetMusclesToTraining" ADD CONSTRAINT "_TargetMusclesToTraining_B_fkey" FOREIGN KEY ("B") REFERENCES "Training"("id") ON DELETE CASCADE ON UPDATE CASCADE;

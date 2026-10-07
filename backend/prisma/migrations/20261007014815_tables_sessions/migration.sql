-- CreateEnum
CREATE TYPE "SessionStatus" AS ENUM ('planned', 'in_progress', 'completed', 'cancelled');

-- CreateEnum
CREATE TYPE "SetStatus" AS ENUM ('pending', 'completed', 'skipped');

-- CreateTable
CREATE TABLE "training_sessions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "trainingId" TEXT NOT NULL,
    "status" "SessionStatus" NOT NULL DEFAULT 'planned',
    "startedAt" TIMESTAMP(3),
    "finishedAt" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "training_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session_exercises" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "exerciseId" TEXT NOT NULL,
    "exerciseName" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "notes" TEXT,

    CONSTRAINT "session_exercises_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session_sets" (
    "id" TEXT NOT NULL,
    "sessionExerciseId" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "status" "SetStatus" NOT NULL DEFAULT 'pending',
    "plannedRepetitions" TEXT,
    "plannedWeight" TEXT,
    "plannedRest" TEXT,
    "actualRepetitions" INTEGER,
    "actualWeightKg" DECIMAL(7,2),
    "actualDurationSec" INTEGER,
    "actualDistanceM" DECIMAL(10,2),
    "actualRestSec" INTEGER,
    "completedAt" TIMESTAMP(3),
    "notes" TEXT,

    CONSTRAINT "session_sets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "training_sessions_userId_createdAt_idx" ON "training_sessions"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "training_sessions_trainingId_idx" ON "training_sessions"("trainingId");

-- CreateIndex
CREATE INDEX "session_exercises_exerciseId_idx" ON "session_exercises"("exerciseId");

-- CreateIndex
CREATE UNIQUE INDEX "session_exercises_sessionId_position_key" ON "session_exercises"("sessionId", "position");

-- CreateIndex
CREATE UNIQUE INDEX "session_sets_sessionExerciseId_number_key" ON "session_sets"("sessionExerciseId", "number");

-- AddForeignKey
ALTER TABLE "training_sessions" ADD CONSTRAINT "training_sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "training_sessions" ADD CONSTRAINT "training_sessions_trainingId_fkey" FOREIGN KEY ("trainingId") REFERENCES "Training"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session_exercises" ADD CONSTRAINT "session_exercises_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "training_sessions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session_exercises" ADD CONSTRAINT "session_exercises_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session_sets" ADD CONSTRAINT "session_sets_sessionExerciseId_fkey" FOREIGN KEY ("sessionExerciseId") REFERENCES "session_exercises"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

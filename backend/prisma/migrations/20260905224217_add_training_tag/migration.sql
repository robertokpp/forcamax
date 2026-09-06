DO $$
BEGIN
  CREATE TYPE "tag" AS ENUM ('push', 'pull', 'legs', 'full', 'core', 'hit');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

ALTER TABLE "Training"
ADD COLUMN "tag" "tag" NOT NULL DEFAULT 'full';

ALTER TABLE "Training"
ALTER COLUMN "tag" DROP DEFAULT;

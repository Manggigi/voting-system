DO $$ BEGIN
 CREATE TYPE "status" AS ENUM('NEW', 'COMPLETED', 'CANCELLED');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "hackathons" RENAME COLUMN "hackthon_status" TO "status";--> statement-breakpoint
ALTER TABLE "hackathons" ALTER COLUMN "status" SET DATA TYPE status;
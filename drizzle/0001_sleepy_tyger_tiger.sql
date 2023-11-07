DO $$ BEGIN
 CREATE TYPE "hackthon_status" AS ENUM('NEW', 'COMPLETED', 'CANCELLED');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "hackathons" ADD COLUMN "hackthon_status" "hackthon_status" NOT NULL;--> statement-breakpoint
ALTER TABLE "hackathons" ADD COLUMN "start_date" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "hackathons" ADD COLUMN "end_date" timestamp NOT NULL;
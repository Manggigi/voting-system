DO $$ BEGIN
 CREATE TYPE "status" AS ENUM('NEW', 'COMPLETED', 'CANCELLED');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "hackathon_judges" (
	"id" serial PRIMARY KEY NOT NULL,
	"hackathon_id" integer NOT NULL,
	"user_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "hackathon_participants" (
	"id" serial PRIMARY KEY NOT NULL,
	"hackathon_team_id" integer NOT NULL,
	"hackathon_id" integer NOT NULL,
	"user_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "hackathon_teams" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"hackathon_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "hackathons" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"status" "status" NOT NULL,
	"start_date" timestamp NOT NULL,
	"end_date" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "judge_votes" (
	"id" serial PRIMARY KEY NOT NULL,
	"score" integer NOT NULL,
	"comments" text NOT NULL,
	"hackathon_judge_id" integer NOT NULL,
	"hackathon_id" integer NOT NULL,
	"hackathon_team_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_votes" (
	"id" serial PRIMARY KEY NOT NULL,
	"hackathon_id" integer NOT NULL,
	"hackathon_team_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"username" text NOT NULL,
	"avatar" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "unique_idx" ON "hackathons" ("name");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "unique_idx" ON "users" ("username");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "hackathon_judges" ADD CONSTRAINT "hackathon_judges_hackathon_id_hackathons_id_fk" FOREIGN KEY ("hackathon_id") REFERENCES "hackathons"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "hackathon_judges" ADD CONSTRAINT "hackathon_judges_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "hackathon_participants" ADD CONSTRAINT "hackathon_participants_hackathon_team_id_hackathon_teams_id_fk" FOREIGN KEY ("hackathon_team_id") REFERENCES "hackathon_teams"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "hackathon_participants" ADD CONSTRAINT "hackathon_participants_hackathon_id_hackathons_id_fk" FOREIGN KEY ("hackathon_id") REFERENCES "hackathons"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "hackathon_participants" ADD CONSTRAINT "hackathon_participants_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "hackathon_teams" ADD CONSTRAINT "hackathon_teams_hackathon_id_hackathons_id_fk" FOREIGN KEY ("hackathon_id") REFERENCES "hackathons"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "judge_votes" ADD CONSTRAINT "judge_votes_hackathon_judge_id_hackathon_judges_id_fk" FOREIGN KEY ("hackathon_judge_id") REFERENCES "hackathon_judges"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "judge_votes" ADD CONSTRAINT "judge_votes_hackathon_id_hackathons_id_fk" FOREIGN KEY ("hackathon_id") REFERENCES "hackathons"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "judge_votes" ADD CONSTRAINT "judge_votes_hackathon_team_id_hackathon_teams_id_fk" FOREIGN KEY ("hackathon_team_id") REFERENCES "hackathon_teams"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "judge_votes" ADD CONSTRAINT "judge_votes_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_votes" ADD CONSTRAINT "user_votes_hackathon_id_hackathons_id_fk" FOREIGN KEY ("hackathon_id") REFERENCES "hackathons"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_votes" ADD CONSTRAINT "user_votes_hackathon_team_id_hackathon_teams_id_fk" FOREIGN KEY ("hackathon_team_id") REFERENCES "hackathon_teams"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_votes" ADD CONSTRAINT "user_votes_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

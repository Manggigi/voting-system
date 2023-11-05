import { pgTable, serial, text, timestamp, uniqueIndex, integer } from 'drizzle-orm/pg-core';
import { sql } from '@vercel/postgres';
import { drizzle } from 'drizzle-orm/vercel-postgres';

// Define tables
export const UsersTable = pgTable(
	'users',
	{
		id: serial('id').primaryKey(),
		name: text('name').notNull(),
		username: text('username').notNull(),
		avatar: text('avatar').notNull(),
		created_at: timestamp('created_at').defaultNow().notNull()
	},
	(users) => {
		return {
			uniqueIdx: uniqueIndex('unique_idx').on(users.username)
		};
	}
);

export const HackathonsTable = pgTable(
	'hackathons',
	{
		id: serial('id').primaryKey(),
		name: text('name').notNull(),
		description: text('description').notNull(),
		created_at: timestamp('created_at').defaultNow().notNull(),
		updated_at: timestamp('updated_at').defaultNow().notNull()
	},
	(hackathon) => {
		return {
			uniqueIdx: uniqueIndex('unique_idx').on(hackathon.name)
		};
	}
);

export const HackathonTeamsTable = pgTable('hackathon_teams', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
	hackathon_id: serial('id')
		.references(() => HackathonsTable.id)
		.notNull()
});

export const HackathonParticipantsTable = pgTable('hackathon_participants', {
	id: serial('id').primaryKey(),
	hackathon_team_id: serial('id')
		.references(() => HackathonTeamsTable.id)
		.notNull(),
	hackathon_id: serial('id')
		.references(() => HackathonsTable.id)
		.notNull(),
	user_id: serial('id')
		.references(() => UsersTable.id)
		.notNull()
});

export const HackathonJudgesTable = pgTable('hackathon_judges', {
	id: serial('id').primaryKey(),
	hackathon_id: serial('id')
		.references(() => HackathonsTable.id)
		.notNull(),
	user_id: serial('id')
		.references(() => UsersTable.id)
		.notNull()
});

export const UserVotesTable = pgTable('user_votes', {
	id: serial('id').primaryKey(),
	hackathon_id: serial('id')
		.references(() => HackathonsTable.id)
		.notNull(),
	hackathon_team_id: serial('id')
		.references(() => HackathonTeamsTable.id)
		.notNull(),
	user_id: serial('id')
		.references(() => UsersTable.id)
		.notNull(),
	created_at: timestamp('created_at').defaultNow().notNull()
});

export const JudgeVotesTable = pgTable('judge_votes', {
	id: serial('id').primaryKey(),
	score: integer('score').notNull(),
	comments: text('comments').notNull(),
	hackathon_judge_id: serial('id')
		.references(() => HackathonJudgesTable.id)
		.notNull(),
	hackathon_id: serial('id')
		.references(() => HackathonsTable.id)
		.notNull(),
	hackathon_team_id: serial('id')
		.references(() => HackathonTeamsTable.id)
		.notNull(),
	user_id: serial('id')
		.references(() => UsersTable.id)
		.notNull(),
	created_at: timestamp('created_at').defaultNow().notNull()
});

// Connect to Vercel Postgres
export const db = drizzle(sql);

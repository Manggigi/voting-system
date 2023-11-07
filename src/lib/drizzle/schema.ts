import {
	integer,
	pgEnum,
	pgTable,
	serial,
	text,
	timestamp,
	uniqueIndex
} from 'drizzle-orm/pg-core';

// Define tables
export const users = pgTable(
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

export const hackthonStatusEnum = pgEnum('hackthon_status', ['NEW', 'COMPLETED', 'CANCELLED']);

export const hackathons = pgTable(
	'hackathons',
	{
		id: serial('id').primaryKey(),
		name: text('name').notNull(),
		description: text('description').notNull(),
		hackthon_status: hackthonStatusEnum('hackthon_status').notNull(),
		start_date: timestamp('start_date').notNull(),
		end_date: timestamp('end_date').notNull(),
		created_at: timestamp('created_at').defaultNow().notNull(),
		updated_at: timestamp('updated_at').defaultNow().notNull()
	},
	(hackathon) => {
		return {
			uniqueIdx: uniqueIndex('unique_idx').on(hackathon.name)
		};
	}
);

export const hackathonTeams = pgTable('hackathon_teams', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
	hackathon_id: integer('hackathon_id')
		.notNull()
		.references(() => hackathons.id)
});

export const hackathonParticipants = pgTable('hackathon_participants', {
	id: serial('id').primaryKey(),
	hackathon_team_id: integer('hackathon_team_id')
		.notNull()
		.references(() => hackathonTeams.id),
	hackathon_id: integer('hackathon_id')
		.notNull()
		.references(() => hackathons.id),
	user_id: integer('user_id')
		.notNull()
		.references(() => users.id)
});

export const hackathonJudges = pgTable('hackathon_judges', {
	id: serial('id').primaryKey(),
	hackathon_id: integer('hackathon_id')
		.notNull()
		.references(() => hackathons.id),
	user_id: integer('user_id')
		.notNull()
		.references(() => users.id)
});

export const userVotes = pgTable('user_votes', {
	id: serial('id').primaryKey(),
	hackathon_id: integer('hackathon_id')
		.notNull()
		.references(() => hackathons.id),
	hackathon_team_id: integer('hackathon_team_id')
		.notNull()
		.references(() => hackathonTeams.id),
	user_id: integer('user_id')
		.notNull()
		.references(() => users.id),
	created_at: timestamp('created_at').defaultNow().notNull()
});

export const judgeVotes = pgTable('judge_votes', {
	id: serial('id').primaryKey(),
	score: integer('score').notNull(),
	comments: text('comments').notNull(),
	hackathon_judge_id: integer('hackathon_judge_id')
		.notNull()
		.references(() => hackathonJudges.id),
	hackathon_id: integer('hackathon_id')
		.notNull()
		.references(() => hackathons.id),
	hackathon_team_id: integer('hackathon_team_id')
		.notNull()
		.references(() => hackathonTeams.id),
	user_id: integer('user_id')
		.notNull()
		.references(() => users.id),
	created_at: timestamp('created_at').defaultNow().notNull()
});

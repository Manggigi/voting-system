import {
	bigint,
	integer,
	pgEnum,
	pgTable,
	text,
	timestamp,
	uniqueIndex,
	varchar
} from 'drizzle-orm/pg-core';

// from lucia
export const users = pgTable(
	'users',
	{
		id: varchar('id', { length: 255 }).primaryKey(),
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

export const session = pgTable('user_session', {
	id: varchar('id', { length: 128 }).primaryKey(),
	userId: varchar('user_id', { length: 255 })
		.notNull()
		.references(() => users.id),
	activeExpires: bigint('active_expires', {
		mode: 'number'
	}).notNull(),
	idleExpires: bigint('idle_expires', {
		mode: 'number'
	}).notNull()
});

export const key = pgTable('user_key', {
	id: varchar('id', { length: 255 }).primaryKey(),
	userId: varchar('user_id', { length: 255 })
		.notNull()
		.references(() => users.id),
	hashedPassword: text('hashed_password')
});

export const statusEnum = pgEnum('status', ['NEW', 'COMPLETED', 'CANCELLED']);

export const hackathons = pgTable(
	'hackathons',
	{
		id: varchar('id', { length: 255 }).primaryKey(),
		name: text('name').notNull(),
		description: text('description').notNull(),
		status: statusEnum('status').notNull(),
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
	id: varchar('id', { length: 255 }).primaryKey(),
	name: text('name').notNull(),
	hackathon_id: varchar('hackathon_id', { length: 255 })
		.notNull()
		.references(() => hackathons.id)
});

export const hackathonParticipants = pgTable('hackathon_participants', {
	id: varchar('id', { length: 255 }).primaryKey(),
	hackathon_team_id: varchar('hackathon_team_id', { length: 255 })
		.notNull()
		.references(() => hackathonTeams.id),
	hackathon_id: varchar('hackathon_id', { length: 255 })
		.notNull()
		.references(() => hackathons.id),
	user_id: varchar('user_id', {
		length: 255
	})
		.notNull()
		.references(() => users.id)
});

export const hackathonJudges = pgTable('hackathon_judges', {
	id: varchar('id', { length: 255 }).primaryKey(),
	hackathon_id: varchar('hackathon_id', { length: 255 })
		.notNull()
		.references(() => hackathons.id),
	user_id: varchar('user_id', { length: 255 })
		.notNull()
		.references(() => users.id)
});

export const userVotes = pgTable('user_votes', {
	id: varchar('id', { length: 255 }).primaryKey(),
	hackathon_id: varchar('hackathon_id', { length: 255 })
		.notNull()
		.references(() => hackathons.id),
	hackathon_team_id: varchar('hackathon_team_id', { length: 255 })
		.notNull()
		.references(() => hackathonTeams.id),
	user_id: varchar('user_id', { length: 255 })
		.notNull()
		.references(() => users.id),
	created_at: timestamp('created_at').defaultNow().notNull()
});

export const judgeVotes = pgTable('judge_votes', {
	id: varchar('id', { length: 255 }).primaryKey(),
	score: integer('score').notNull(),
	comments: text('comments').notNull(),
	hackathon_judge_id: varchar('hackathon_judge_id', { length: 255 })
		.notNull()
		.references(() => hackathonJudges.id),
	hackathon_id: varchar('hackathon_id', { length: 255 })
		.notNull()
		.references(() => hackathons.id),
	hackathon_team_id: varchar('hackathon_team_id', { length: 255 })
		.notNull()
		.references(() => hackathonTeams.id),
	user_id: varchar('user_id', { length: 255 })
		.notNull()
		.references(() => users.id),
	created_at: timestamp('created_at').defaultNow().notNull()
});

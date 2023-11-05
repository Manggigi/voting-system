import type {
	HackathonJudgesTable,
	HackathonParticipantsTable,
	HackathonTeamsTable,
	HackathonsTable,
	JudgeVotesTable,
	UserVotesTable,
	UsersTable
} from '$lib/drizzle';
import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';

export type User = InferSelectModel<typeof UsersTable>;
export type NewUser = InferInsertModel<typeof UsersTable>;
export type Hackathon = InferSelectModel<typeof HackathonsTable>;
export type NewHackathon = InferInsertModel<typeof HackathonsTable>;
export type HackathonTeams = InferSelectModel<typeof HackathonTeamsTable>;
export type NewHackathonTeams = InferInsertModel<typeof HackathonTeamsTable>;
export type HackathonParticipants = InferSelectModel<typeof HackathonParticipantsTable>;
export type NewHackathonParticipants = InferInsertModel<typeof HackathonParticipantsTable>;
export type HackathonJudges = InferSelectModel<typeof HackathonJudgesTable>;
export type NewHackathonJudges = InferInsertModel<typeof HackathonJudgesTable>;
export type UserVotes = InferSelectModel<typeof UserVotesTable>;
export type NewUserVotes = InferInsertModel<typeof UserVotesTable>;
export type JudgeVotes = InferSelectModel<typeof JudgeVotesTable>;
export type NewJudgeVotes = InferInsertModel<typeof JudgeVotesTable>;

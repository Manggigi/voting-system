import type {
	hackathonJudges,
	hackathonParticipants,
	hackathonTeams,
	hackathons,
	judgeVotes,
	userVotes,
	users
} from '$lib/drizzle/schema';
import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';

export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;
export type Hackathon = InferSelectModel<typeof hackathons>;
export type NewHackathon = InferInsertModel<typeof hackathons>;
export type HackathonTeams = InferSelectModel<typeof hackathonTeams>;
export type NewHackathonTeams = InferInsertModel<typeof hackathonTeams>;
export type HackathonParticipants = InferSelectModel<typeof hackathonParticipants>;
export type NewHackathonParticipants = InferInsertModel<typeof hackathonParticipants>;
export type HackathonJudges = InferSelectModel<typeof hackathonJudges>;
export type NewHackathonJudges = InferInsertModel<typeof hackathonJudges>;
export type UserVotes = InferSelectModel<typeof userVotes>;
export type NewUserVotes = InferInsertModel<typeof userVotes>;
export type JudgeVotes = InferSelectModel<typeof judgeVotes>;
export type NewJudgeVotes = InferInsertModel<typeof judgeVotes>;

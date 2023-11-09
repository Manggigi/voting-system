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
export type HackathonTeam = InferSelectModel<typeof hackathonTeams>;
export type NewHackathonTeam = InferInsertModel<typeof hackathonTeams>;
export type HackathonParticipant = InferSelectModel<typeof hackathonParticipants>;
export type NewHackathonParticipant = InferInsertModel<typeof hackathonParticipants>;
export type HackathonJudge = InferSelectModel<typeof hackathonJudges>;
export type NewHackathonJudge = InferInsertModel<typeof hackathonJudges>;
export type UserVote = InferSelectModel<typeof userVotes>;
export type NewUserVote = InferInsertModel<typeof userVotes>;
export type JudgeVote = InferSelectModel<typeof judgeVotes>;
export type NewJudgeVote = InferInsertModel<typeof judgeVotes>;

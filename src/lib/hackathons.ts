import { and, eq } from 'drizzle-orm';
import { db } from './drizzle';
import {
	hackathonJudges,
	hackathonTeams,
	hackathons,
	judgeVotes,
	userVotes
} from './drizzle/schema';
import type { NewHackathon, NewHackathonTeam, NewJudgeVote, NewUserVote } from '@types';

export const createHackathon = async (hackathonData: NewHackathon) => {
	await db.insert(hackathons).values(hackathonData).execute();
};

export const getHackathons = async () => {
	const hackathonsData = await db.select().from(hackathons);
	return hackathonsData;
};

export const getHackathonById = async (hackathonId: number) => {
	const hackathonData = await db
		.select()
		.from(hackathons)
		.where(eq(hackathons.id, hackathonId));
	return hackathonData[0];
};

export const createTeam = async (teamData: NewHackathonTeam) => {
	await db.insert(hackathonTeams).values(teamData).execute();
};

export const getUserVoteByUserId = async (userId: string) => {
	const userVoteData = await db.select().from(userVotes).where(eq(userVotes.user_id, userId));
	return userVoteData[0];
};

export const getHackathonTeams = async () => {
	const hackathonTeamsData = await db.select().from(hackathonTeams);
	return hackathonTeamsData;
};

export const getHackathonJudges = async () => {
	const hackathonJudgesData = await db.select().from(hackathonJudges);
	return hackathonJudgesData;
};

export const getTeamsByHackathonId = async (hackathonId: number) => {
	const teamData = await db
		.select()
		.from(hackathonTeams)
		.fullJoin(hackathons, eq(hackathons.id, hackathonTeams.hackathon_id))
		.where(eq(hackathonTeams.hackathon_id, hackathonId));
	return teamData;
};

export const createUserVote = async (userVoteData: NewUserVote) => {
	await db.insert(userVotes).values(userVoteData).execute();
};

export const getUserVotesByHackathonId = async (hackathonId: number, hackathonTeam: number) => {
	const userVoteData = await db
		.select()
		.from(userVotes)
		.where(
			and(eq(userVotes.hackathon_id, hackathonId), eq(userVotes.hackathon_team_id, hackathonTeam))
		);
	return userVoteData;
};

export const createJudgeVote = async (judgeVoteData: NewJudgeVote) => {
	await db.insert(judgeVotes).values(judgeVoteData).execute();
};

export const getJudgeVotesByHackathonId = async (hackathonId: number, hackathonTeam: number) => {
	const judgeVotesData = await db
		.select()
		.from(judgeVotes)
		.where(
			and(eq(judgeVotes.hackathon_id, hackathonId), eq(judgeVotes.hackathon_team_id, hackathonTeam))
		);
	return judgeVotesData;
};

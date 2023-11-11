import type {
	NewHackathon,
	NewHackathonJudge,
	NewHackathonParticipant,
	NewHackathonTeam,
	NewJudgeVote,
	NewUserVote
} from '@types';
import { and, eq } from 'drizzle-orm';
import { db } from './drizzle';
import {
	hackathonJudges,
	hackathonParticipants,
	hackathonTeams,
	hackathons,
	judgeVotes,
	userVotes
} from './drizzle/schema';

export const createHackathon = async (hackathonData: NewHackathon) => {
	await db.insert(hackathons).values(hackathonData).onConflictDoNothing().execute();
};

export const getHackathons = async () => {
	const hackathonsData = await db.select().from(hackathons);
	return hackathonsData;
};

export const getHackathonById = async (hackathonId: string) => {
	const hackathonData = await db.select().from(hackathons).where(eq(hackathons.id, hackathonId));
	return hackathonData[0];
};

export const createTeam = async (teamData: NewHackathonTeam) => {
	await db.insert(hackathonTeams).values(teamData).onConflictDoNothing().execute();
};

export const getUserVoteByUserId = async (userId: string) => {
	const userVoteData = await db.select().from(userVotes).where(eq(userVotes.user_id, userId));
	return userVoteData[0];
};

export const getHackathonTeams = async () => {
	const hackathonTeamsData = await db.select().from(hackathonTeams);
	return hackathonTeamsData;
};

export const getHackathonTeamsByHackathonId = async (hackathonId: string) => {
	const hackathonTeamsData = await db
		.select()
		.from(hackathonTeams)
		.where(eq(hackathonTeams.hackathon_id, hackathonId));
	return hackathonTeamsData;
};

export const getJudgesByHackathonId = async (hackathonId: string) => {
	const hackathonJudgesData = await db
		.select()
		.from(hackathonJudges)
		.where(eq(hackathonJudges.hackathon_id, hackathonId));
	return hackathonJudgesData;
};

export const getAlltUserVotesInHackathon = async (hackathonId: string) => {
	const userVoteData = await db
		.select()
		.from(userVotes)
		.where(eq(userVotes.hackathon_id, hackathonId));
	return userVoteData;
};

export const getTeamsByHackathonId = async (hackathonId: string) => {
	const teamData = await db
		.select()
		.from(hackathonTeams)
		.fullJoin(hackathons, eq(hackathons.id, hackathonTeams.hackathon_id))
		.where(eq(hackathonTeams.hackathon_id, hackathonId));
	return teamData;
};

export const createUserVote = async (userVoteData: NewUserVote) => {
	await db.insert(userVotes).values(userVoteData).onConflictDoNothing().execute();
};

export const getUserVotesByHackathonId = async (hackathonId: string, hackathonTeamId: string) => {
	const userVoteData = await db
		.select()
		.from(userVotes)
		.where(
			and(eq(userVotes.hackathon_id, hackathonId), eq(userVotes.hackathon_team_id, hackathonTeamId))
		);
	return userVoteData;
};

export const createJudgeVote = async (judgeVoteData: NewJudgeVote) => {
	await db.insert(judgeVotes).values(judgeVoteData).onConflictDoNothing().execute();
};

export const getHackathonJudges = async () => {
	const judges = await db.select().from(hackathonJudges);
	return judges;
};

export const getJudgeVotesByHackathonId = async (hackathonId: string, hackathonTeamId: string) => {
	const judgeVotesData = await db
		.select()
		.from(judgeVotes)
		.where(
			and(
				eq(judgeVotes.hackathon_id, hackathonId),
				eq(judgeVotes.hackathon_team_id, hackathonTeamId)
			)
		);
	return judgeVotesData;
};

export const createHackathonParticipant = async (
	hackathonParticipantData: NewHackathonParticipant
) => {
	await db
		.insert(hackathonParticipants)
		.values(hackathonParticipantData)
		.onConflictDoNothing()
		.execute();
};

export const createHackathonJudge = async (hackathonJudgeData: NewHackathonJudge) => {
	await db.insert(hackathonJudges).values(hackathonJudgeData).onConflictDoNothing().execute();
};

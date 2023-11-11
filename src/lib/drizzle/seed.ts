import { db } from '$lib/drizzle';
import {
	hackathonJudges,
	hackathonParticipants,
	hackathonTeams,
	hackathons,
	judgeVotes,
	userVotes,
	users
} from './schema';
import type {
	Hackathon,
	NewHackathonJudge,
	NewHackathonParticipant,
	NewHackathonTeam,
	NewJudgeVote,
	NewUser,
	NewUserVote,
	User
} from '@types';
import { nanoid } from 'nanoid';

const usersList = [
	'andite',
	'toney010319',
	'BadPapi',
	'HOTDOG',
	'angry_talong',
	'DDruan19',
	'dembahhhhh',
	'matchu',
	'Luffy',
	'Benar',
	'FluffyBuddy',
	'Oshi',
	'Akini',
	'krispi_cream',
	'erika',
	'shelledfish',
	'getgian',
	'thermo_ecs',
	'asbeelzebub',
	'dev.enigma',
	'logorhythm',
	'delulu',
	'Boybeee',
	'MacAngel23',
	'Annie'
];

const userBuilder = (user: string) => ({
	id: nanoid(),
	username: user,
	name: user,
	avatar: 'https://www.redditstatic.com/avatars/defaults/v2/avatar_default_1.png',
	created_at: new Date()
});
const newUsers: NewUser[] = usersList.map((user) => userBuilder(user));

const newHackathons: Hackathon[] = [
	{
		id: nanoid(),
		name: 'Daedalus Hackathon - Season 1',
		description:
			'Hackathon Voting System. A squad is composed of 3-5 members. Squad composition is carefully selected by the judging committee based on each individual’s skill level. Choose your Squad Lead/Captain! Have fun!',
		status: 'COMPLETED',
		created_at: new Date(),
		updated_at: new Date(),
		start_date: new Date('10-12-2023'),
		end_date: new Date('10-13-2023')
	},
	{
		id: nanoid(),
		name: 'Daedalus Hackathon - Season 2',
		description:
			'Hackathon Voting System. A squad is composed of 3-5 members. Squad composition is carefully selected by the judging committee based on each individual’s skill level. Choose your Squad Lead/Captain! Have fun!',
		status: 'NEW',
		created_at: new Date(),
		updated_at: new Date(),
		start_date: new Date('11-12-2023'),
		end_date: new Date('11-13-2023')
	},
	{
		id: nanoid(),
		name: 'Daedalus Hackathon - Season 3',
		description:
			'Hackathon Voting System. A squad is composed of 3-5 members. Squad composition is carefully selected by the judging committee based on each individual’s skill level. Choose your Squad Lead/Captain! Have fun!',
		status: 'NEW',
		created_at: new Date(),
		updated_at: new Date(),
		start_date: new Date('12-12-2023'),
		end_date: new Date('12-13-2023')
	}
];
// TODO: hack for now, but this should be dynamic
// const teams = ['ReactPressPHP', 'CastAway', 'Team Chibog', 'MAPEH', "D'Rocketeers🚀"];
const teams = ['Team Chibog', 'MAPEH', "D'Rocketeers🚀", 'ReactPressPHP', 'CastAway'];

const newHackathonTeams: NewHackathonTeam[] = newHackathons.flatMap((hackathon) => {
	return teams.map((team) => ({
		id: nanoid(),
		name: team,
		hackathon_id: hackathon.id
	}));
});

const newHackathonParticipants: NewHackathonParticipant[] = newHackathons.flatMap((hackathon) => {
	let teamsInThisHackathon = newHackathonTeams.filter((team) => team.hackathon_id === hackathon.id);
	teamsInThisHackathon = teamsInThisHackathon.sort(
		(a, b) => teams.indexOf(a.name) - teams.indexOf(b.name)
	);
	return newUsers.map((user, userIndex) => {
		return {
			id: nanoid(),
			hackathon_id: hackathon.id,
			user_id: user.id,
			hackathon_team_id: teamsInThisHackathon[userIndex % teamsInThisHackathon.length].id
		};
	});
});

const judgesList = ['directormac', 'mjrolex', 'jesymn'];
const judgeUsers: NewUser[] = judgesList.map((user) => userBuilder(user));

const newHackathonJudges: NewHackathonJudge[] = newHackathons.flatMap((hackathon) => {
	return judgeUsers.map((judge) => ({
		id: nanoid(),
		hackathon_id: hackathon.id,
		user_id: judge.id
	}));
});

const newUserVotes: NewUserVote[] = newHackathons.flatMap((hackathon, i) => {
	if (i === 1) return []; // skip the second hackathon
	const teamsInThisHackathon = newHackathonTeams.filter(
		(team) => team.hackathon_id === hackathon.id
	);
	if (teamsInThisHackathon.length === 0) {
		return []; // return an empty array if there are no teams for this hackathon
	}
	return newUsers.map((user) => ({
		id: nanoid(),
		hackathon_id: hackathon.id,
		user_id: user.id,
		hackathon_team_id:
			teamsInThisHackathon[Math.floor(Math.random() * teamsInThisHackathon.length)].id,
		created_at: new Date()
	}));
});

const newJudgeVotes: NewJudgeVote[] = newHackathonTeams.flatMap((team) => {
	return judgeUsers.map((judge) => ({
		id: nanoid(),
		hackathon_id: team.hackathon_id,
		user_id: judge.id,
		score: Math.floor(Math.random() * 10) + 1 + 15,
		comments: 'This is a comment',
		hackathon_judge_id:
			newHackathonJudges.find((newJudge) => judge.id === newJudge.user_id)?.id || '',
		hackathon_team_id: team.id,
		created_at: new Date()
	}));
});

export async function seed() {
	const usersData = await db.select().from(users);
	if (usersData.length === 0) {
		const insertedUsers: User[] = await db
			.insert(users)
			.values([...newUsers, ...judgeUsers])
			.returning()
			.onConflictDoNothing();
		console.log(`Seeded ${insertedUsers.length} users`);
	}

	const hackathonsData = await db.select().from(hackathons);
	if (hackathonsData.length === 0) {
		const insertedHackathons = await db
			.insert(hackathons)
			.values(newHackathons)
			.returning()
			.onConflictDoNothing();
		console.log(`Seeded ${insertedHackathons.length} hackathons`);
	}

	const hackathonTeamsData = await db.select().from(hackathonTeams);
	if (hackathonTeamsData.length === 0) {
		const insertedHackathonTeams = await db
			.insert(hackathonTeams)
			.values(newHackathonTeams)
			.returning()
			.onConflictDoNothing();
		console.log(`Seeded ${insertedHackathonTeams.length} hackathon teams`);
	}

	const hackathonParticipantsData = await db.select().from(hackathonParticipants);
	if (hackathonParticipantsData.length === 0) {
		const insertedHackathonParticipants = await db
			.insert(hackathonParticipants)
			.values(newHackathonParticipants)
			.returning()
			.onConflictDoNothing();
		console.log(`Seeded ${insertedHackathonParticipants.length} hackathon participants`);
	}

	const hackathonJudgesData = await db.select().from(hackathonJudges);
	if (hackathonJudgesData.length === 0) {
		const insertedHackathonJudges = await db
			.insert(hackathonJudges)
			.values(newHackathonJudges)
			.returning()
			.onConflictDoNothing();
		console.log(`Seeded ${insertedHackathonJudges.length} hackathon judges`);
	}

	const userVotesData = await db.select().from(userVotes);
	if (userVotesData.length === 0) {
		const insertedUserVotes = await db
			.insert(userVotes)
			.values(newUserVotes)
			.returning()
			.onConflictDoNothing();
		console.log(`Seeded ${insertedUserVotes.length} user votes`);
	}

	const judgeVotesData = await db.select().from(judgeVotes);
	if (judgeVotesData.length === 0) {
		const insertedJudgeVotes = await db
			.insert(judgeVotes)
			.values(newJudgeVotes)
			.returning()
			.onConflictDoNothing();
		console.log(`Seeded ${insertedJudgeVotes.length} judge votes`);
	}

	console.log(`No more seeding needed!`);

	return {};
}

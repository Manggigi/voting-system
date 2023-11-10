export const routes = {
	home: '/',
	login: '/login',
	register: '/register',
	logout: '/logout',
	thankYou: '/thank-you',
	alreadyVoted: '/already-voted',
	hackathon: {
		base: '/hackathons',
		hackaton: (hackathonId: string) => `/hackathons/${hackathonId}`,
		vote: (hackathonId: string) => `/hackathons/${hackathonId}/vote`,
		results: (hackathonId: string) => `/hackathons/${hackathonId}/results`
	},
	teams: {
		base: '/teams',
		team: (teamId: string) => `/teams/${teamId}`
	},
	judges: {
		base: '/judges',
		judge: (judgeId: string) => `/judges/${judgeId}`
	}
};

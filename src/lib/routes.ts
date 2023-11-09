export const routes = {
	home: '/',
	login: '/login',
	register: '/register',
	logout: '/logout',
	hackathon: {
		base: '/hackathons',
		hackaton: (hackathonId: number) => `/hackathons/${hackathonId}`,
		vote: (hackathonId: number) => `/hackathons/${hackathonId}/vote`,
		results: (hackathonId: number) => `/hackathons/${hackathonId}/results`
	},
	teams: {
		base: '/teams',
		team: (teamId: number) => `/teams/${teamId}`
	},
	judges: {
		base: '/judges',
		judge: (judgeId: number) => `/judges/${judgeId}`
	}
};

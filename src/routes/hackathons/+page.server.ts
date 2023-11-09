export async function load({ parent }) {
	// const hackathons = await getHackathons();
	const { hackathons } = await parent();

	return {
		hackathons
	};
}

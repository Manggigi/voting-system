export async function load({ parent }) {
	const { hackathons } = await parent();

	return {
		hackathons
	};
}

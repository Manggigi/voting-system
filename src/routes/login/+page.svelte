<script lang="ts">
	import FaBrandsDiscord from 'svelte-icons-pack/fa/FaBrandsDiscord';
	import type { PageData } from './$types';
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import { routes } from '$lib/routes';

	export let data: PageData;
</script>

<!-- Login with Discord Button -->

<div class="min-h-[80vh] grid place-items-center">
	<div class="logo-cloud w-full">
		<a class="logo-item" href="/login/discord">
			<span>
				<Icon src={FaBrandsDiscord} className="cursor-pointer" color="white" size="1.875em" />
			</span>
			<span>Login with Discord</span>
		</a>
	</div>
</div>

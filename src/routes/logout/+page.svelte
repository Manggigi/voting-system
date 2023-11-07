<script lang="ts">
	import { goto } from '$app/navigation';
	import { userStore } from '$lib/stores.js';
	import { onMount } from 'svelte';

	export let data;

	onMount(() => {
		localStorage.removeItem('user');
		document.cookie = 'user=; path=/;';
		userStore.set(null);
		goto('/');
	});
</script>

<h1>logout</h1>

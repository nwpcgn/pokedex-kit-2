<script lang="ts">
	import { goto } from '$app/navigation'
	import SignInform from './SignInform.svelte'
	import supabase from './supabase.js'
	import getUser from './getUser'
	import { auth } from '../game.svelte.ts'
	let { children } = $props()

	supabase.auth.onAuthStateChange((event, session) => {
		if (event === 'SIGNED_IN') {
			auth.initUser(session.user)
		} else {
			auth.initUser(null)
		}
	})

	const initUser = async () => {
		const user = await getUser()
		auth.initUser(user)
	}

	let promise = initUser()

	$effect(async () => {
		if (!auth.user) {
			goto('#/')
		}
	})
</script>

{#await promise then _}
	{#if !auth.user}
		<SignInform></SignInform>
	{/if}
{/await}

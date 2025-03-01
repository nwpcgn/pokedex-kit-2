<script lang="ts">
	import Profill from './Profill.svelte'
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
</script>

<div class="navbar bg-neutral text-neutral-content shadow-sm">
	<div class="flex-1">
		<a href="#/" class="btn btn-neutral text-xl">nwp-cgn</a>
	</div>
	<div class="flex-none">
		<a href="#/game" class="btn btn-circle btn-neutral">
			<span class="sr-only">Game</span>
			<svg class="pkmn-icon pkmn-pokeball"
				><use xlink:href="#pkmn-pokeball"></use></svg>
		</a>
	</div>
</div>

{#await promise}
	<div>...loading</div>
{:then value}
	<section class="bg-base-100 grid h-1/2 place-content-center">
		{#if auth.user}
			<Profill></Profill>
		{:else}
			<article class="content-sm">
				<SignInform></SignInform>
			</article>
		{/if}
	</section>
{/await}

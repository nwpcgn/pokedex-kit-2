<script lang="ts">
	import supabase from './supabase.js'
	import { auth } from '../game.svelte.ts'
	const handleSignOut = async (event) => {
		const { error } = await supabase.auth.signOut()
		if (!error) {
			// game.init()
			console.log('SignOut')
		}
	}
	const getProfil = async (id) => {
		let { data, error } = await supabase
			.from('players')
			.select('*')
			.eq('user_id', id)

		if (data) {
			return data[0]
		}
	}

	$effect(async () => {
		if (auth.user) {
			const id = auth.user.id
			const player = await getProfil(id)
			auth.initProfil(player)
		}
	})
</script>

<nav class="rounded-box flex items-center justify-between gap-4 p-4 shadow-sm">
	<div>
		{#if auth.profil}
			<span class="text-2xl font-bold">{auth.profil?.username}</span>
		{/if}
	</div>
	<button class="btn btn-error btn-sm" onclick={handleSignOut}>Logout</button>
</nav>

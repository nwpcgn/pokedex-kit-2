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
			console.log({ player })
		}
	})
</script>

<section class="page-layer bg-base-100 center nwp">
	<article class="content-sm space-y-4">
		<hgroup>
			<h2 class="text-center">Auth</h2>
		</hgroup>
		<nav class="flex justify-center gap-2">
			<button class="btn btn-error" onclick={handleSignOut}>Logout</button>
		</nav>
	</article>
</section>

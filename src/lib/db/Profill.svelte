<script lang="ts">
	import supabase from './supabase.js'

	const handleSignOut = async (event) => {
		const { error } = await supabase.auth.signOut()
		if (!error) {
			// game.init()
			console.log('SignOut')
		}
	}
</script>

<article class="content-sm space-y-4">
	<hgroup>
		<h2 class="text-center">Auth</h2>
	</hgroup>
	<nav class="flex justify-center gap-2">
		<button class="btn btn-error" onclick={handleSignOut}>Logout</button>
	</nav>
</article>

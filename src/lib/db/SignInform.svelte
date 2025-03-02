<script lang="ts">
	import { fade, fly } from 'svelte/transition'
	import supabase from './supabase.js'
	let mail = $state('')
	let pw = $state('')

	const handleSignIn = async (event) => {
		event.preventDefault()
		const { data, error } = await supabase.auth.signInWithPassword({
			email: mail,
			password: pw
		})

		if (data) {
			console.log({ data })
		}
	}
</script>

<section class="main-page" in:fly={{ y: 400 }} out:fade={{ duration: 200 }}>
	<article class="content-sm">
		<form onsubmit={handleSignIn}>
			<fieldset
				class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
				<legend class="fieldset-legend">Sign In</legend>

				<label class="fieldset-label">Title</label>
				<input
					bind:value={mail}
					required
					type="email"
					class="input"
					placeholder="Email" />

				<label class="fieldset-label">Slug</label>
				<input
					bind:value={pw}
					required
					type="password"
					class="input"
					placeholder="Password" />

				<label class="fieldset-label">Submit</label>
				<input type="submit" class="btn" value="Login" />
			</fieldset>
		</form>
	</article>
</section>

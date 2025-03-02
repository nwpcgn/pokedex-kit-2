<script lang="ts">
	import Logout from '$lib/db/Logout.svelte'
	const tabs = [
		{
			name: 'Main',
			component: mainT
		},
		{
			name: 'User',
			component: userT
		}
	]
	let currentTab = $state(0)

	const handleTabClick = (e) => {
		e.preventDefault()
		const id = parseInt(e.currentTarget.dataset.tab)
		if (tabs[id]) {
			currentTab = id
		}
	}
</script>

<section class="main-page">
	<header class="flex justify-center shadow">
		<nav role="tablist" class="tabs tabs-border">
			{#each tabs as item, i}
				<a
					onclick={handleTabClick}
					role="tab"
					class="tab"
					data-tab={i}
					class:tab-active={i == currentTab}>{item.name}</a>
			{/each}
		</nav>
	</header>
	<article class="main-grid">
		{#each tabs as item, i}
			{#if currentTab == i}
				{@render item.component?.()}
			{/if}
		{/each}
	</article>
</section>

{#snippet mainT()}
	<section class="content main-page">
		<hgroup class="my-auto space-y-4 py-2 text-center">
			<h1>Nwp-Gaming</h1>
			<h3>Pkmn-Battle</h3>
			<p>
				<a href="#/game" class="btn btn-neutral btn-wide">Start</a>
			</p>
		</hgroup>
	</section>
{/snippet}

{#snippet userT()}
	<section class="content main-page">
		<hgroup class="space-y-2 py-2 text-center">
			<h1 class="text-4xl font-extrabold">User Panel</h1>
		</hgroup>
		<Logout></Logout>
	</section>
{/snippet}

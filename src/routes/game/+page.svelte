<script lang="ts">
	import PokeList from '$lib/components/PokeList.svelte'
	import { game, Fighter, getTypeStyle } from '$lib/game.svelte.ts'
	import PokeDialog from '$lib/components/PokeDialog.svelte'
	let selectEd = $state({} | null)
	let showModal = $state(false)
	const pkmnSelect = async (e) => {
		e.preventDefault()
		const id = parseInt(e.currentTarget.dataset.pkmn)
		const pkmn = game.pokedex.find((x) => x.id == id)
		createFighter(pkmn)
	}

	const createFighter = ({ id, name, type, base }) => {
		const obj = {
			id,
			name,
			type,
			hp: base.HP,
			attack: base.Attack,
			defense: base.Defense,
			speed: base.Speed
		}
		selectEd = new Fighter(obj)
		showModal = true
	}
</script>

<!-- <div class="flex justify-center shadow">
	<nav role="tablist" class="tabs tabs-border">
		<a role="tab" data-tab="1" class="tab tab-active">Pokedex</a><a
			role="tab"
			data-tab="0"
			class="tab">Battle</a>
	</nav>
</div> -->

<PokeList onSelect={pkmnSelect}></PokeList>

<PokeDialog bind:showModal>
	{#if selectEd}
		{@render pkmnDetailT(selectEd)}
	{/if}
</PokeDialog>

{#snippet pkmnDetailT({ id, name, type, hp, attack, defense, speed })}
	<header class="text-center text-4xl font-extrabold capitalize">{name}</header>
	<figure class="flex justify-center py-2">
		<img
			alt=""
			src="./img/pkmn/thumbnails/{id.toString().padStart(3, '0')}.png" />
	</figure>
	<article>
		<div class="flex justify-center gap-2 py-2 text-sm">
			{#each type as item}
				<span
					class="flex-1 rounded-full px-4 py-1 text-center font-thin"
					style={getTypeStyle(item)}>{item}</span>
			{/each}
		</div>
	</article>
	<div class="grid gap-1 py-2">
		<div class="flex items-center justify-between gap-2 capitalize">
			<span class="w-1/4 truncate italic">hp</span>
			<progress class="progress w-full" max="100" value={hp}></progress>
			<span class=" font-bold">{hp}</span>
		</div>
		<div class="flex items-center justify-between gap-2 capitalize">
			<span class="w-1/4 truncate italic">attack</span>
			<progress class="progress w-full" max="100" value={attack}></progress>
			<span class=" font-bold">{attack}</span>
		</div>
		<div class="flex items-center justify-between gap-2 capitalize">
			<span class="w-1/4 truncate italic">defense</span>
			<progress class="progress w-full" max="100" value={defense}></progress>
			<span class=" font-bold">{defense}</span>
		</div>

		<div class="flex items-center justify-between gap-2 capitalize">
			<span class="w-1/4 truncate italic">speed</span>
			<progress class="progress w-full" max="100" value={speed}></progress>
			<span class=" font-bold">{speed}</span>
		</div>
	</div>
	<div class="modal-action">
		<form method="dialog">
			<!-- if there is a button, it will close the modal -->
			<button class="btn">Close</button>
		</form>
	</div>
{/snippet}

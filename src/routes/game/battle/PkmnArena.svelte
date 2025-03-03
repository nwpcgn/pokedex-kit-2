<script lang="ts">
	import { game, getTypeStyle } from '$lib/game.svelte.ts'
	import randNum from '$lib/utils/randNum.js'
	let {
		player = $bindable(),
		oppo = $bindable(),
		onNext,
		id,
		name,
		slug,
		title
	} = $props()
	let moves = $state(game?.moves)
	let actions = $state([] | null)

	const callMoves = async () => {
		actions = [moves.shift(), moves.shift(), moves.shift()]
	}

	const handleAttack = async (obj) => {
		if (!obj) {
			console.error('no obj', e)
			return
		}
		let dice = 1
		if (obj?.accuracy) dice = obj.accuracy / 100
		if (dice == 1) dice = 0.9
		if (Math.random() < dice) {
			const result = randNum(2, 8)
			const damage = Math.max(1, Math.floor(result))
			oppo.hp = Math.max(0, oppo.hp - damage)
		} else {
			console.error('Attack fail')
		}
	}
</script>

<div>
	<div class="grid grid-cols-2 gap-4">
		<div class="bg-base-100 rounded-box p-4 text-center shadow-sm">
			{@render cardT(player)}
		</div>
		<div class="bg-base-100 rounded-box p-4 text-center shadow-sm">
			{@render cardT(oppo)}
		</div>
	</div>
</div>
<div class="bg-base-100 rounded-box flex justify-center gap-2 p-4 shadow-sm">
	<button class="btn" onclick={callMoves}>Attack</button>
	<span class="flex-1"></span>
	{#if player.hp <= 0 || oppo.hp <= 0}
		<button
			class="btn"
			onclick={onNext}>Finish</button>
	{:else}
		{#each actions as item}
			<button class="btn" data-move={item.id} onclick={() => handleAttack(item)}
				>{item?.category}</button>
		{/each}
	{/if}
</div>

{#snippet cardT({ id, name, type, hp, attack, defense, speed })}
	<header class="text-center text-4xl font-extrabold capitalize">{name}</header>
	<figure class="flex justify-center py-2">
		<img
			alt=""
			width="100"
			height="100"
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
{/snippet}

<script lang="ts">
	import { game, Fighter, getTypeStyle } from '$lib/game.svelte.ts'
	import PkmnProgress from '$lib/components/PkmnProgress.svelte'
	import shuffle from '$lib/utils/shuffle.js'
	let { data } = $props()
	const steps = [
		{
			id: 1,
			name: 'Battle',
			slug: 'battle',
			title: 'Select your Fighter',
			component: step1
		},
		{
			id: 2,
			name: 'Opponent',
			slug: 'opponent',
			title: 'Find your Opponent',
			component: step2
		},
		{
			id: 3,
			name: 'Arena',
			slug: 'arena',
			title: 'Fight',
			component: step3
		},
		{
			id: 4,
			name: 'Finish',
			slug: 'finish',
			title: 'Results',
			component: step4
		}
	]
	let moves = $state(game?.moves)
	let currentStep = $state(0)
	let player = $state({} | null)
	let oppo = $state({} | null)
	let actions = $state([] | null)
	const createPlayer = ({ id, name, type, base }) => {
		const obj = {
			id,
			name,
			type,
			hp: base.HP,
			attack: base.Attack,
			defense: base.Defense,
			speed: base.Speed
		}
		player = new Fighter(obj)
	}
	const createOppo = ({ id, name, type, base }) => {
		const obj = {
			id,
			name,
			type,
			hp: base.HP,
			attack: base.Attack,
			defense: base.Defense,
			speed: base.Speed
		}
		oppo = new Fighter(obj)
	}

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
			const result = Math.floor(Math.random() * obj?.power)
			const damage = Math.floor((result / 100) * obj?.power)
			oppo.hp = Math.max(0, oppo.hp - damage)
		} else {
			console.error('Attack fail')
		}

		console.log({ dice }, obj.accuracy)
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

<section class="main-page">
	<article class="content space-y-4">
		<header class="bg-base-100 rounded-box mb-4 p-4 shadow">
			<div class="flex items-center justify-between gap-4">
				<h1 class="flex items-center gap-4 text-3xl font-semibold">
					<span>{steps[currentStep].name}</span>
				</h1>
				<span class="badge badge-sm">{currentStep + 1} / {steps.length}</span>
			</div>

			<PkmnProgress max={steps.length - 1} value={currentStep}></PkmnProgress>
			<h3 class="mt-1 text-lg font-medium">{steps[currentStep].title}</h3>
		</header>

		{#each steps as step, i}
			{#if i == currentStep}
				{@render step.component(step)}
			{/if}
		{/each}
		<!-- 		<header
				class="bg-base-100 rounded-box flex justify-center gap-2 p-4 shadow">
				<button class="btn btn-circle" aria-label="pkmn-left">
					<svg class="pkmn-icon pkmn-left">
						<use xlink:href="#pkmn-left"></use>
					</svg>
				</button>
				<button class="btn btn-circle" aria-label="pkmn-right">
					<svg class="pkmn-icon pkmn-right">
						<use xlink:href="#pkmn-right"></use>
					</svg>
				</button>
				<button class="btn btn-circle" aria-label="pkmn-close">
					<svg class="pkmn-icon pkmn-close">
						<use xlink:href="#pkmn-close"></use>
					</svg>
				</button>
				<button class="btn btn-circle" aria-label="pkmn-search">
					<svg class="pkmn-icon pkmn-search">
						<use xlink:href="#pkmn-search"></use>
					</svg>
				</button>
				<button class="btn btn-circle" aria-label="pkmn-height">
					<svg class="pkmn-icon pkmn-height">
						<use xlink:href="#pkmn-height"></use>
					</svg>
				</button>
				<button class="btn btn-circle" aria-label="pkmn-tag">
					<svg class="pkmn-icon pkmn-tag">
						<use xlink:href="#pkmn-tag"></use>
					</svg>
				</button>
				<button class="btn btn-circle" aria-label="pkmn-pokeball">
					<svg class="pkmn-icon pkmn-pokeball">
						<use xlink:href="#pkmn-pokeball"></use>
					</svg>
				</button>
				<button class="btn btn-circle" aria-label="pkmn-bar">
					<svg class="pkmn-icon pkmn-bar">
						<use xlink:href="#pkmn-bar"></use>
					</svg>
				</button>
				<button class="btn btn-circle" aria-label="pkmn-db">
					<svg class="pkmn-icon pkmn-db">
						<use xlink:href="#pkmn-db"></use>
					</svg>
				</button>
				<button class="btn btn-circle" aria-label="pkmn-burger">
					<svg class="pkmn-icon pkmn-burger">
						<use xlink:href="#pkmn-burger"></use>
					</svg>
				</button>
				<button class="btn btn-circle" aria-label="pkmn-options">
					<svg class="pkmn-icon pkmn-options">
						<use xlink:href="#pkmn-options"></use>
					</svg>
				</button>
			</header> -->
	</article>
</section>

{#snippet step1({ id, name, slug, title })}
	<div class="bg-base-100 rounded-box p-4 text-center shadow-sm">
		<button
			class="btn btn-lg btn-wide btn-outline"
			onclick={() => {
				const obj = shuffle(game.pokedex)
				createPlayer(obj[0])
			}}>Change</button>
		<button
			disabled={!player}
			class="btn btn-outline btn-neutral btn-lg btn-wide"
			onclick={() => {
				currentStep = currentStep + 1
			}}>Select</button>
	</div>
	{#if player}
		<div class="bg-base-100 rounded-box p-4 text-center shadow-sm">
			{@render cardT(player)}
		</div>
	{:else}
		<div class="bg-base-100 rounded-box h-[360px] p-4 text-center shadow-sm">
		</div>
	{/if}
{/snippet}
{#snippet step2({ id, name, slug, title })}
	<div class="bg-base-100 rounded-box p-4 text-center shadow-sm">
		<button
			class="btn btn-lg btn-wide btn-outline"
			onclick={() => {
				const obj = shuffle(game.pokedex)
				createOppo(obj[0])
			}}>Change</button>
		<button
			disabled={!player}
			class="btn btn-outline btn-neutral btn-lg btn-wide"
			onclick={() => {
				currentStep = currentStep + 1
			}}>Select</button>
	</div>
	{#if oppo}
		<div class="bg-base-100 rounded-box p-4 text-center shadow-sm">
			{@render cardT(oppo)}
		</div>
	{:else}
		<div class="bg-base-100 rounded-box h-[360px] p-4 text-center shadow-sm">
		</div>
	{/if}
{/snippet}
{#snippet step3({ id, name, slug, title })}
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
		{#each actions as item}
			<button class="btn" data-move={item.id} onclick={() => handleAttack(item)}
				>{item?.category}</button>
		{/each}
	</div>
{/snippet}
{#snippet step4({ id, name, slug, title })}
	<div class="bg-base-100 rounded-box p-4 text-center shadow-sm">
		<button
			class="btn"
			onclick={() => {
				currentStep = 0
			}}>Restart</button>
	</div>
{/snippet}
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

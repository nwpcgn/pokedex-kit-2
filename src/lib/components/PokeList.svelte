<script lang="ts">
	import PkmnProgress from './PkmnProgress.svelte'
	import { Tween } from 'svelte/motion'
	import { fade } from 'svelte/transition'
	import { cubicOut } from 'svelte/easing'
	import { game } from '$lib/game.svelte.ts'
	import gArr from '$lib/utils/gArr.js'
	import paginate from '$lib/utils/paginate.js'
	let { onSelect } = $props()
	let listSize = $state(9)
	let currentPage = $state(0)
	let pokeList = $state(paginate(game.pokedex, listSize))
	let pageList = $derived(pokeList[currentPage])
	let overList = $derived(gArr(listSize - pageList.length))
	let progress = new Tween(0, {
		duration: 500,
		easing: cubicOut
	})
	const nextPage = () => {
		if (currentPage < pokeList.length - 1) {
			currentPage = currentPage + 1
		}
	}
	const prevPage = () => {
		if (currentPage > 0) {
			currentPage = currentPage - 1
		}
	}

	$effect(() => {
		progress.target = currentPage
	})
</script>

{#snippet tileT({ id, name })}
	<figure
		in:fade={{ duration: 200, delay: 100 }}
		class="rounded-box flex aspect-square flex-col justify-between bg-center bg-no-repeat p-2 shadow"
		style="background-image: url('./img/pkmn/thumbnails/{id
			.toString()
			.padStart(3, '0')}.png');">
		<div class="text-right">
			<button
				onclick={onSelect}
				data-pkmn={id}
				class="cursor-pointer text-xl font-bold"
				>#{id.toString().padStart(3, '0')}</button>
		</div>
		<div class="truncate text-center">
			<span class="text-2xl font-extrabold">{name}</span>
		</div>
	</figure>
{/snippet}

<section class="main-page">
	<article class="content">
		<header class="bg-base-100 rounded-box mb-4 p-4 shadow">
			<div class="flex items-center justify-between gap-4">
				<h1 class="flex items-center gap-4 text-3xl font-semibold">
					<span>Pokedex</span>
				</h1>
				<span class="badge badge-sm"
					>{(currentPage + 1).toString().padStart(2, '0')} / {pokeList.length}</span>
			</div>

			<PkmnProgress max={pokeList.length - 1} value={currentPage}
			></PkmnProgress>
		</header>

		<div class="bg-base-100 rounded-box grid grid-cols-3 gap-4 p-4 shadow">
			{#key currentPage}
				{#each pageList as { id, name, type, base }}
					{@render tileT({ id, name })}
				{/each}
			{/key}
			{#each overList as item}
				<figure class="rounded-box bg-base-100 aspect-square shadow-sm">
				</figure>
			{/each}
		</div>
		<div class="mt-4 flex justify-center">
			<div class="join grid grid-cols-3">
				<button
					disabled={currentPage <= 0}
					class="btn btn-ghost join-item"
					aria-lagel="previous"
					onclick={prevPage}>
					<svg class="pkmn-icon pkmn-left">
						<use xlink:href="#pkmn-left"></use>
					</svg>
				</button>
				<span class="join-item btn btn-ghost"
					>{(currentPage + 1).toString().padStart(2, '0')} / {pokeList.length}</span>
				<button
					disabled={currentPage >= pokeList.length - 1}
					class="join-item btn-ghost btn"
					aria-label="next"
					onclick={nextPage}>
					<svg class="pkmn-icon pkmn-right">
						<use xlink:href="#pkmn-right"></use>
					</svg>
				</button>
			</div>
		</div>
	</article>
</section>
{#snippet iconT(name)}
	<svg class="pkmn-icon"><use xlink:href="#{name}"></use></svg>
{/snippet}

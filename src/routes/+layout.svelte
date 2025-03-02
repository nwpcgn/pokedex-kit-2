<script lang="ts">
	import '../app.css'
	import '../nwp.css'
	import { page } from '$app/state'
	import Auth from '$lib/db/Auth.svelte'
	import SvgSprite from '../lib/SvgSprites.svelte'
	let { children, data } = $props()
	let current = $derived(page.url.hash.replace('#', ''))
</script>

<nav class="bg-error navbar text-error-content shadow-sm">
	<div class="flex-1">
		<a href="#/" class="btn btn-error text-xl">
			<svg class="pkmn-icon mr-2" style="--fs: 32px;">
				<use xlink:href="#pkmn-pokeball"></use>
			</svg><span>Pokedex</span></a>
	</div>
	<div class="flex gap-2">
		{#if current.includes('pokedex')}
			<label class="input rounded-full bg-base-100 text-base-content">
				<span class="label"
					><svg class="pkmn-icon" style="--fs: 20px;">
						<use xlink:href="#pkmn-search"></use>
					</svg>
				</span>
				<input type="text" placeholder="search" />
			</label>
			<button tabindex="0" class="btn btn-ghost btn-circle" aria-label="Tag">
				<svg class="pkmn-icon" style="">
					<use xlink:href="#pkmn-tag"></use>
				</svg>
			</button>
		{/if}
	</div>
</nav>
<main class="main-grid">
	<Auth>
		{@render children()}
	</Auth>
</main>

{#snippet iconT(name)}
	<svg class="pkmn-icon {name}"><use xlink:href="#{name}"></use></svg>
{/snippet}

{#if current !== '/'}
	<footer class="foo-bar" style="--fs: 26px">
		{#each data.nav as { name, href, icon }}
			<a href="#{href}" class="transition-all ease-in duration-300" class:dock-active={current === href}>
				{@render iconT(icon)}
				<span class="sr-only">{name}</span>
			</a>
		{/each}
	</footer>
{/if}

<SvgSprite></SvgSprite>

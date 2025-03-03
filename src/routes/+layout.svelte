<script lang="ts">
	import '../app.css'
	import '../nwp.css'
	import { page } from '$app/state'
	import SvgSprite from '../lib/components/SvgSprites.svelte'
	let { children } = $props()
	let current = $derived(page.url.hash.replace('#', ''))
</script>

<nav class="bg-neutral navbar text-neutral-content shadow-sm">
	<div class="flex-1">
		<a href="#/" class="btn btn-neutral text-xl">
			<svg class="pkmn-icon pkmn-pokeball" style="--fs: 26px">
				<use xlink:href="#pkmn-pokeball"></use>
			</svg><span class="ml-2">battle-arena</span></a>
	</div>
	<div class="flex-none">
		<ul class="menu menu-horizontal px-1">
			<li><a href="#/game">Pokedex</a></li>
			<li><a href="#/game/battle">Battle</a></li>
		</ul>
	</div>
</nav>


{@render children()}



<SvgSprite></SvgSprite>

<script lang="ts">
	import Auth from '$lib/db/Auth.svelte'
	import SvgSprite from '../lib/sprites/SvgSprites.svelte'
	import '../app.css'
	import '../nwp.css'
	let { children } = $props()
</script>

<div class="navbar bg-neutral text-neutral-content shadow-sm">
	<div class="flex-1">
		<a href="#/" class="btn btn-neutral text-xl">nwp-cgn</a>
	</div>
	<div class="flex-none">
		<a href="#/game" class="btn btn-circle btn-neutral">
			<span class="sr-only">Game</span>
			<svg class="pkmn-icon pkmn-pokeball"
				><use xlink:href="#pkmn-pokeball"></use></svg>
		</a>
	</div>
</div>

{@render children()}

<Auth></Auth>

<SvgSprite></SvgSprite>

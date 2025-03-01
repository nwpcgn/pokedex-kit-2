<script lang="ts">
	import Auth from '$lib/db/Auth.svelte'
	import SvgSprite from '../lib/sprites/SvgSprites.svelte'
	import '../app.css'
	import '../nwp.css'
	let { children } = $props()
</script>

<Auth></Auth>

{@render children()}

<SvgSprite></SvgSprite>

<script lang="ts">
	import { Tween } from 'svelte/motion'
	import { cubicOut } from 'svelte/easing'
	let progress = new Tween(0, {
		duration: 500,
		easing: cubicOut
	})
	let { max = 100, value = 0 } = $props()

	$effect(() => {
		progress.target = value
	})
</script>

<progress class="progress progress-info w-full" value={progress.current} {max}
></progress>

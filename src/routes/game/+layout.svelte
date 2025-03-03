<script lang="ts">
	let { children } = $props()
</script>

<!-- <div class="flex justify-center shadow">
	<nav role="tablist" class="tabs tabs-border">
		<a role="tab" data-tab="1" class="tab tab-active">Pokedex</a><a
			role="tab"
			data-tab="0"
			class="tab">Battle</a>
	</nav>
</div> -->

<main class="main-grid">
	{@render children?.()}
</main>

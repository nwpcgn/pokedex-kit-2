<script>
	let { showModal = $bindable(), header, children } = $props()

	let dialog = $state() // HTMLDialogElement

	$effect(() => {
		if (showModal) dialog.showModal()
	})
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
<dialog
	bind:this={dialog}
	onclose={() => (showModal = false)}
	onclick={(e) => {
		if (e.target === dialog) dialog.close()
	}}
	class="modal">
	<div class="modal-box">
		{@render children?.()}
	</div>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>

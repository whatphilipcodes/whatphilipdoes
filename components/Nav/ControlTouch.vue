<template>
	<div class="absolute bottom-0 right-0 flex flex-col-reverse gap-4">
		<Button
			v-for="button in buttons.slice().reverse()"
			class="w-20 h-20"
			:to="button.to"
			:variant="button.accent ? 'accent' : 'basic'"
			:download="button.download ?? undefined"
			>{{ button.label }}</Button
		>
	</div>
</template>

<script setup lang="ts">
defineProps({
	buttons: {
		type: Array as PropType<
			{ label: string; to: string; accent?: boolean; download?: string }[]
		>,
		default: () => [],
	},
})
</script>

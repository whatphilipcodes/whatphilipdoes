<template>
	<div class="absolute bottom-0 right-0 flex flex-col-reverse gap-4">
		<Button
			v-for="button in buttons.slice().reverse()"
			class="w-20 h-20"
			:to="typeof button.to === 'string' ? button.to : undefined"
			:callback="typeof button.to === 'function' ? button.to : undefined"
			:variant="button.accent ? 'accent' : 'basic'"
			:download="button.download ?? undefined"
			>{{ button.label }}</Button
		>
	</div>
</template>

<script setup lang="ts">
defineProps({
	buttons: {
		type: Array as PropType<buttonData[]>,
		default: () => [],
	},
})
</script>

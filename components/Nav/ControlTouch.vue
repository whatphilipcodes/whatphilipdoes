<template>
	<div class="absolute bottom-0 right-0 flex flex-col-reverse gap-4">
		<Button
			v-for="button in props.buttons.slice(0, 2).reverse()"
			class="w-20 h-20 hyphens-manual"
			padding-override="p-3"
			:to="typeof button.to === 'string' ? button.to : undefined"
			:callback="typeof button.to === 'function' ? button.to : undefined"
			:variant="button.accent ? 'accent' : 'basic'"
			:download="button.download ?? undefined"
			>{{ button.label }}</Button
		>
	</div>
</template>

<script setup lang="ts">
const props = defineProps({
	buttons: {
		type: Array as PropType<buttonData[]>,
		default: () => [],
		validator: (value: buttonData[]) => {
			if (value.length <= 2) {
				return true
			} else {
				console.warn(
					`ControlTouch: Only 2 buttons are displayed at a time but ${value.length} were provided.`
				)
				return false
			}
		},
	},
})
</script>

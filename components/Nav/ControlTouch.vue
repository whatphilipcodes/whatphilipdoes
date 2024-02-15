<template>
	<div
		class="absolute bottom-0 right-0 flex flex-col-reverse gap-4 transition-opacity duration-300"
		:class="opacity"
	>
		<Button
			v-for="button in buffer.slice(0, 2).reverse()"
			class="h-20 w-20 hyphens-manual"
			padding-override="p-3"
			:to="typeof button.to === 'string' ? button.to : undefined"
			:callback="typeof button.to === 'function' ? button.to : undefined"
			:variant="button.variant ?? 'basic'"
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
					`ControlTouch: Only 2 buttons are displayed at a time but ${value.length} were provided.`,
				)
				return false
			}
		},
	},
})

let opacity = ''
let buffer: buttonData[] = []
let empty = true
watchEffect(() => {
	if (props.buttons.length === 0) {
		if (empty) return
		opacity = 'opacity-0'
		setTimeout(() => {
			console.log('buffer reset')
			empty = true
			buffer = []
		}, 300)
	} else {
		empty = false
		opacity = ''
		buffer = props.buttons
	}
})
</script>

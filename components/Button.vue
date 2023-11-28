<template>
	<component :is="props.as" :class="buttonClasses">
		<slot />
	</component>
</template>

<script setup lang="ts">
const props = defineProps({
	as: {
		type: [String, Object],
		default: 'button',
	},
	variant: {
		type: String,
		validator: (value: string) => ['basic', 'accent'].includes(value),
		default: 'basic',
	},
})

const buttonClasses = computed(() => {
	return {
		'flex flex-col inline-block justify-center text-center align-middle select-none py-1 px-2 border':
			true,
		'border-mono-900 bg-mono-900 active:bg-mono-50 active:border-mono-50 hover:bg-mono-800 hover:border-mono-800':
			props.variant === 'basic',
		'text-cinnabar-500 border-cinnabar-500 hover:bg-cinnabar-500/20 active:bg-cinnabar-500':
			props.variant === 'accent',
	}
})
</script>

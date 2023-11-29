<template>
	<component :is="props.as">
		<button :class="buttonClasses">
			<slot />
		</button>
	</component>
</template>

<script setup lang="ts">
// thanks to -> https://www.youtube.com/watch?v=0-h16HmNmVY

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
		'flex justify-center text-center select-none py-1 px-2 border': true,
		'border-mono-900 bg-mono-900 active:bg-mono-50 active:border-mono-50 lg:hover:bg-mono-800 lg:hover:border-mono-800 lg:active:bg-mono-50 lg:active:border-mono-50':
			props.variant === 'basic',
		'text-cinnabar-500 border-cinnabar-500 active:bg-cinnabar-500 lg:hover:bg-cinnabar-500/20 lg:active:bg-cinnabar-500':
			props.variant === 'accent',
	}
})
</script>

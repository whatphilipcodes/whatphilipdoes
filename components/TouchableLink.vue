<template>
	<NuxtLink :custom="false" :href="props.href"
		><span
			ref="linkElement"
			:class="`transition-colors ease-in-out duration-300 underline underline-offset-[3px] ${parseForTailwind(
				colors.idle
			)} ${parseForTailwind(colors.hover, 'hover:')} ${parseForTailwind(
				colors.active,
				'active:'
			)}`"
			@touchstart="setActive"
			@touchend="resetActive"
		>
			<slot /></span
	></NuxtLink>
</template>

<script setup lang="ts">
const props = defineProps({
	href: {
		type: String,
		required: true,
	},
	variant: {
		type: String,
		validator: (value: string) =>
			['dark', 'inline-dark', 'accent', 'inline-accent'].includes(value),
		default: 'dark',
	},
})

const colors = computed(() => {
	switch (props.variant) {
		case 'inline-dark':
			return {
				idle: ['text-mono-500', 'decoration-transparent'],
				hover: ['text-mono-500', 'decoration-mono-500'],
				active: ['text-mono-400', 'decoration-mono-400'],
			}
		case 'inline-accent':
			return {
				idle: ['text-cinnabar-500', 'decoration-transparent'],
				hover: ['text-cinnabar-500', 'decoration-cinnabar-500'],
				active: ['text-cinnabar-400', 'decoration-cinnabar-400'],
			}
		default:
			return {
				idle: ['text-mono-500', 'decoration-transparent'],
				hover: ['text-mono-300', 'decoration-transparent'],
				active: ['text-mono-50', 'decoration-transparent'],
			}
	}
})

const linkElement = ref<HTMLAnchorElement | null>(null)
let clearAutoReset: NodeJS.Timeout | null = null
function setActive() {
	linkElement.value?.classList.remove(
		...colors.value.idle,
		'transition-colors',
		'ease-in-out',
		'duration-300'
	)
	linkElement.value?.classList.add(...colors.value.active)
	clearAutoReset = setTimeout(resetActive, 500)
}
function resetActive() {
	clearTimeout(clearAutoReset!)
	linkElement.value?.classList.remove(
		...colors.value.active,
		'transition-colors',
		'ease-in-out',
		'duration-300'
	)
	linkElement.value?.classList.add(...colors.value.idle)
}

// helpers
function parseForTailwind(classes: string[], prefix?: string) {
	if (prefix) return classes.map((c) => `${prefix}${c}`).join(' ')
	return classes.join(' ')
}
</script>

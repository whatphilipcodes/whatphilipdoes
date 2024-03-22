<template>
	<NuxtLink
		:custom="false"
		:href="props.href"
		@touchstart="setActive"
		@touchend="resetActive"
		@mousedown="setActive"
		@mouseup="setActive"
		><span
			ref="linkElement"
			:class="`underline underline-offset-[3px] transition-colors duration-300 ease-in-out ${parseForTailwind(
				colors.idle,
			)} ${parseForTailwind(colors.hover, 'hover:')} ${parseForTailwind(
				colors.active,
				'active:',
			)}`"
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
				idle: ['text-mono-600', 'decoration-transparent'],
				hover: ['text-mono-600', 'decoration-mono-600'],
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
				idle: ['text-mono-600', 'decoration-transparent'],
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
		'duration-300',
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
		'duration-300',
	)
	linkElement.value?.classList.add(...colors.value.idle)
}

// helpers
function parseForTailwind(classes: string[], prefix?: string) {
	if (prefix) return classes.map((c) => `${prefix}${c}`).join(' ')
	return classes.join(' ')
}
</script>

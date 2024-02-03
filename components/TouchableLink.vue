<template>
	<NuxtLink :custom="false" :href="props.href"
		><span
			ref="linkElement"
			:class="`${colors.idle} ${parseForTailwind(
				'hover:',
				colors.hover
			)} ${parseForTailwind('active:', colors.active)}`"
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
		validator: (value: string) => ['dark', 'accent'].includes(value),
		default: 'dark',
	},
})

const colors = computed(() => {
	switch (props.variant) {
		case 'accent':
			return {
				idle: ['text-cinnabar-500'],
				hover: ['text-cinnabar-500', 'underline'],
				active: ['text-cinnabar-400', 'underline'],
			}
		default:
			return {
				idle: ['text-mono-500'],
				hover: ['text-mono-300'],
				active: ['text-mono-50'],
			}
	}
})

const linkElement = ref<HTMLAnchorElement | null>(null)
let clearAutoReset: NodeJS.Timeout | null = null
function setActive() {
	linkElement.value?.classList.remove(...colors.value.idle)
	linkElement.value?.classList.add(...colors.value.active)
	clearAutoReset = setTimeout(resetActive, 500)
}
function resetActive() {
	clearTimeout(clearAutoReset!)
	linkElement.value?.classList.remove(...colors.value.active)
	linkElement.value?.classList.add(...colors.value.idle)
}

function setHover() {
	linkElement.value?.classList.remove(...colors.value.idle)
	linkElement.value?.classList.add(...colors.value.hover)
}
function resetHover() {
	linkElement.value?.classList.remove(...colors.value.hover)
	linkElement.value?.classList.add(...colors.value.idle)
}

// helpers
function parseForTailwind(prefix: string, classes: string[]) {
	return classes.map((c) => `${prefix}${c}`).join(' ')
}
</script>

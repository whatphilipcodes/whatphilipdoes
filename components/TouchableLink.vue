<template>
	<NuxtLink :custom="false" :href="props.href"
		><div
			ref="linkElement"
			class="text-mono-500 lg:hover:text-mono-300 lg:active:text-mono-50"
			@touchstart="setActive"
			@touchend="resetActive"
		>
			<slot /></div
	></NuxtLink>
</template>

<script setup lang="ts">
const props = defineProps({
	href: {
		type: String,
		required: true,
	},
})

const linkElement = ref<HTMLAnchorElement | null>(null)
let clearAutoReset: NodeJS.Timeout | null = null
function setActive() {
	linkElement.value?.classList.remove('text-mono-500')
	linkElement.value?.classList.add('text-mono-50')
	clearAutoReset = setTimeout(resetActive, 500)
}
function resetActive() {
	clearTimeout(clearAutoReset!)
	linkElement.value?.classList.remove('text-mono-50')
	linkElement.value?.classList.add('text-mono-500')
}
</script>

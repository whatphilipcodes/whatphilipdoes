<template>
	<div
		ref="scroller"
		class="absolute top-0 left-0 h-screen w-screen overflow-y-scroll"
	>
		<div id="scroll-01" ref="01" class="w-full h-[50vh] bg-mono-700"></div>
		<div ref="test" class="w-full bg-cinnabar-500"></div>
		<div id="scroll-02" ref="02" class="w-full h-[50vh] bg-mono-600"></div>
		<div id="scroll-03" ref="03" class="w-full h-[50vh] bg-mono-500"></div>
		<div id="scroll-04" ref="04" class="w-full h-[50vh] bg-mono-400"></div>
	</div>
</template>

<script setup lang="ts">
import { useIntersectionObserver } from '@vueuse/core'
import { useScrollLock } from '@vueuse/core'

const test = ref<HTMLElement | null>(null)
const scroller = ref<HTMLElement | null>(null)

const targetIsVisible = ref(false)
const isLocked = useScrollLock(scroller)
isLocked.value = false

const { stop } = useIntersectionObserver(
	test,
	([{ isIntersecting }], observerElement) => {
		targetIsVisible.value = isIntersecting
	}
)

watch(targetIsVisible, (value) => {
	if (value) {
		console.log('target is visible')
	} else {
		console.log('target is not visible')
		isLocked.value = true
		console.log(test.value?.offsetTop)
	}
})
</script>
<style scoped></style>

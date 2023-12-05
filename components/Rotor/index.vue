<template>
	<div
		ref="projectRotator"
		id="project-rotator"
		class="w-screen h-screen justify-self-center overflow-y-scroll scrollbar-hide snap-y snap-mandatory bg-cinnabar-900"
	>
		<div
			ref="test"
			class="snap-always snap-center max-lg:w-screen max-lg:justify-self-center bg-cinnabar-700 h-screen"
		></div>
		<div
			class="snap-always snap-center max-lg:w-screen max-lg:justify-self-center bg-cinnabar-800 h-screen"
		></div>
		<div
			class="snap-always snap-center max-lg:w-screen max-lg:justify-self-center bg-cinnabar-900 h-screen"
		></div>
	</div>
</template>

<script setup lang="ts">
import { useIntersectionObserver } from '@vueuse/core'
const test = ref<HTMLElement | null>(null)
const targetIsVisible = ref(false)

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
	}
})

onMounted(() => {
	console.log('rotor is mounted')
	console.log(test.value) // Make sure this is not null
})

watch(test, (value) => {
	console.log('offsetTop', value)
})
</script>
<style scoped>
/* For Webkit-based browsers (Chrome, Safari and Opera) */
.scrollbar-hide::-webkit-scrollbar {
	display: none;
}

/* For IE, Edge and Firefox */
.scrollbar-hide {
	-ms-overflow-style: none; /* IE and Edge */
	scrollbar-width: none; /* Firefox */
}
</style>

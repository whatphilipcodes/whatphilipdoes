<template>
	<div id="top" class="w-screen h-[80vh] bg-mono-700">landing</div>
	<div ref="trigger" class="w-full relative" />
	<div id="slider" ref="container" class="w-screen h-screen bg-cinnabar-500">
		slider
	</div>
	<div id="bottom" class="w-screen h-screen bg-mono-900">bottom</div>
</template>

<script setup lang="ts">
import { useIntersectionObserver } from '#imports'
import Lenis from '@studio-freight/lenis'

const container = ref<HTMLElement | null>(null) // the element supposed to be scrolled to
const trigger = ref<HTMLElement | null>(null)

onMounted(() => {
	const lenis = new Lenis({
		smoothTouch: true,
	})
	function raf(time: any) {
		lenis.raf(time)
		requestAnimationFrame(raf)
	}
	requestAnimationFrame(raf)

	const isVisible = ref(true)
	useIntersectionObserver(
		trigger,
		([{ isIntersecting }]) => {
			isVisible.value = isIntersecting
		},
		{
			rootMargin: '-200px 0px 0px 0px',
		}
	)

	watch(isVisible, (newValue) => {
		console.log('isVisible changed:', newValue)
		if (lenis.direction < 0) return
		lenis.scrollTo(container.value?.offsetTop, {
			lock: true,
			onComplete: () => {
				console.log('scroll complete stopping instance')
				lenis.stop()
			},
		})
	})

	// resume lenis on click (for testing only)
	document.addEventListener('click', (event) => {
		console.log('lenis running')
		lenis.start()
	})
})
</script>

<!-- <style lang="css">
html.lenis {
	height: auto;
}

.lenis.lenis-smooth {
	scroll-behavior: auto;
}

.lenis.lenis-smooth [data-lenis-prevent] {
	overscroll-behavior: contain;
}

.lenis.lenis-stopped {
	overflow: hidden;
}

.lenis.lenis-scrolling iframe {
	pointer-events: none;
}
</style> -->

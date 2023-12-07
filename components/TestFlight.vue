<template>
	<div id="top" class="w-screen h-[80vh] bg-mono-700">landing</div>
	<div ref="trigger" class="w-full relative">{{ msg }}</div>
	<Rotor id="container" />
	<div id="bottom" class="sticky top-0 w-screen h-screen bg-mono-900">
		bottom
	</div>
</template>

<script setup lang="ts">
import { useIntersectionObserver } from '#imports'
import Lenis from '@studio-freight/lenis'

const container = ref<HTMLElement | null>(null) // the element supposed to be scrolled to
const trigger = ref<HTMLElement | null>(null)

const msg = ref('booting')

onMounted(() => {
	msg.value = 'mounted'
	container.value = document.getElementById('container')

	const lenis = new Lenis({
		touchMultiplier: 1,
		smoothTouch: true,
		orientation: 'vertical',
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
				freezeTouchScrolling()
			},
		})
	})

	// resume lenis on click (for testing only)
	document.addEventListener('click', (event) => {
		console.log('lenis running')
		lenis.start()
	})
})

function freezeTouchScrolling() {
	window.addEventListener(
		'touchstart',
		(event) => {
			event.preventDefault()
			// scroll back to current
			window.scrollTo({
				top: container.value?.offsetTop,
			})
		},
		{
			passive: false,
		}
	)
}
</script>

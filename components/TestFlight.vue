<template>
	<div id="top" class="w-screen h-[80vh] bg-mono-700">landing</div>
	<div
		ref="trigger"
		id="if you can read this you are great"
		class="w-full relative"
	></div>
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

// const trigger2 = ref<HTMLElement | null>(null)
// const targetArray = [trigger, trigger2

onMounted(() => {
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

	useIntersectionObserver(
		trigger,
		([{ isIntersecting, target }]) => {
			console.log('scroll stop detected')
			if (isIntersecting) return
			if (lenis.direction < 0) return
			const htmlTarget = target as HTMLElement
			lenis.scrollTo(htmlTarget.offsetTop, {
				lock: true,
				onComplete: () => {
					console.log('scroll complete stopping instance')
					lenis.stop()
					freezeTouchScrolling()
				},
			})
		},
		{
			rootMargin: '-200px 0px 0px 0px',
		}
	)

	// // resume lenis on click (for testing only)
	// document.addEventListener('click', (event) => {
	// 	console.log('lenis running')
	// 	lenis.start()
	// })
})

function freezeTouchScrolling() {
	window.addEventListener(
		'touchstart',
		(event) => {
			event.preventDefault()
			// scroll back to current?
			// window.scrollTo({
			// 	top: container.value?.offsetTop,
			// })
		},
		{
			passive: false,
		}
	)
}
</script>

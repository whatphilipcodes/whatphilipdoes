<template>
	<div class="z-front max-lg:hidden w-44 h-8 justify-self-end col-start-12">
		<Button class="w-full" variant="accent">get in touch</Button>
	</div>
	<TextBlock
		:tags="tags"
		:text="text"
		:callToAction="callToAction"
		class="lg:mt-44 col-span-full lg:col-span-8"
	/>
	<!-- <div id="problem" class="h-screen col-span-2 bg-cinnabar-600"></div> -->
	<div class="mt-44 col-span-full" />
	<div class="mt-44 col-span-full" />
	<ScrollStop>
		<Rotor />
	</ScrollStop>
	<div class="mt-44 col-span-full" />
	<div class="mt-44 col-span-full" />
	<TextBlock
		:tags="tags"
		:text="text"
		:callToAction="callToAction"
		class="lg:mt-44 col-span-full lg:col-span-8"
	/>
	<div class="mt-44 col-span-full" />
	<div class="mt-44 col-span-full" />
	<!-- <div class="mt-44 col-span-full" /> -->
</template>

<script setup lang="ts">
import Lenis from '@studio-freight/lenis'
const store = useGlobalStore()

let isInitialization = true

onMounted(() => {
	const lenis = new Lenis({
		// touchMultiplier: 2,
		// smoothTouch: true,
		// syncTouch: true,
		orientation: 'vertical',
		gestureOrientation: 'vertical',
	})
	function raf(time: any) {
		lenis.raf(time)
		requestAnimationFrame(raf)
	}
	requestAnimationFrame(raf)

	useIntersectionObserver(
		store.scrollStopperCollection,
		([{ isIntersecting, target }]) => {
			// console.log('intersection observer', isIntersecting, target.id)
			if (isInitialization) {
				isInitialization = false
				return
			}
			if (isIntersecting || lenis.direction < 0) return
			const htmlTarget = target as HTMLElement
			console.log('trigger left viewport: scrolling to target')
			stopScroll()
			lenis.scrollTo(htmlTarget.offsetTop, {
				lock: true,
				onComplete: () => {
					console.log('scroll complete stopping instance')
					lenis.stop()
				},
			})
			setTimeout(() => {
				console.log('restarting touch Scrolling')
				startScroll()
				lenis.start()
			}, 5000)
		},
		{
			rootMargin: '-200px 0px 0px 0px',
		}
	)

	function stopScroll() {
		window.addEventListener('touchstart', blockEvent, {
			passive: false,
		})
		window.addEventListener('wheel', blockEvent, {
			passive: false,
		})
	}
	function startScroll() {
		window.removeEventListener('touchstart', blockEvent)
		window.removeEventListener('wheel', blockEvent)
	}
	function blockEvent(event: Event) {
		console.log('blocking event')
		event.preventDefault()
	}
})

// useComplexScroll()
const tags = ['frontend dev', 'machine learning', 'digital design']
const text =
	'Former design student turned creative developer. Focusing on ui design and implementation as well as machine learning in generative realms.'
const callToAction = { label: 'about philip', to: '/about' }
</script>

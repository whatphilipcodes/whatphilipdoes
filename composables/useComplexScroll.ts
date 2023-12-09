import Lenis from '@studio-freight/lenis'
export const useComplexScroll = () => {
	const store = useGlobalStore()
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
			store.scrollStopperCollection,
			([{ isIntersecting, target }]) => {
				console.log('isIntersecting', isIntersecting)
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
}

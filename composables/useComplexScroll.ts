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
						stopTouchScroll()
					},
				})
				setTimeout(() => {
					console.log('starting touch Scrolling')
					startTouchScroll()
				}, 3000)
			},
			{
				rootMargin: '-200px 0px 0px 0px',
			}
		)
		function stopTouchScroll() {
			window.addEventListener(
				'touchstart',
				(event) => {
					event.preventDefault()
				},
				{
					passive: false,
				}
			)
			lenis.stop()
		}
		function startTouchScroll() {
			lenis.start()
			window.removeEventListener('touchstart', (event) => {
				event.preventDefault()
			})
		}
	})
}

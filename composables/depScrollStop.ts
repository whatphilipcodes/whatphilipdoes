import Lenis from '@studio-freight/lenis'
const store = useGlobalStore()

let isInitialization = true

const lenis = new Lenis({
	touchMultiplier: 2,
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
const target = new HTMLElement()
const { stop } = useIntersectionObserver(
	target,
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

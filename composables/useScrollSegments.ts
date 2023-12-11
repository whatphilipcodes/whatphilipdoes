export const useScrollSegments = () => {
	// dependencies
	const { scrollSegmentTriggers, toggleScrollTrigger } = useGlobalStore()

	// initialization
	const activeSegement = ref(0)
	toggleScrollTrigger(activeSegement.value)
	scrollSegementsLoop()

	// loop
	function scrollSegementsLoop() {
		const { stop } = useIntersectionObserver(
			scrollSegmentTriggers[activeSegement.value].target,
			([{ isIntersecting, target }]) => {
				console.log('intersection observer', isIntersecting, target.id) // #rm
				if (!isIntersecting) return
				stop()
				blockScrolling()
				setTimeout(() => {
					activeSegement.value++
					toggleScrollTrigger(activeSegement.value)
					enableScrolling()
					scrollSegementsLoop()
				}, 5000)
			}
		)
	}

	// methods
	function blockScrolling() {
		// #info: touchmove while allowing etc. btns without modification is not 100% reliable in blocking scrolling
		window.addEventListener('touchstart', blockEvent, {
			passive: false,
		})
		window.addEventListener('wheel', blockEvent, {
			passive: false,
		})
	}

	function enableScrolling() {
		window.removeEventListener('touchstart', blockEvent)
		window.removeEventListener('wheel', blockEvent)
	}

	function blockEvent(event: Event) {
		console.log('blocking event')
		event.preventDefault()
	}
}

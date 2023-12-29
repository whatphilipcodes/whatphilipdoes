export const useScrollStops = () => {
	// dependencies
	const {
		scrollStopTriggers,
		toggleStopTrigger,
		getStopTriggerIndex,
		clearScrollStopTriggers,
	} = useGlobalStore()

	// props
	const activeIndex = ref(0)
	const scrollingBlocked = ref(false)
	const activeStop = computed(() => {
		return scrollStopTriggers[activeIndex.value]
	})

	// controller
	function enter() {
		// initialization
		activeIndex.value = 0
		scrollingBlocked.value = false
		toggleStopTrigger(activeIndex.value) // show first segment
		startLoop()
	}
	function exit() {
		clearScrollStopTriggers()
	}

	// loop
	function startLoop() {
		const { stop } = useIntersectionObserver(
			activeStop.value.target,
			([{ isIntersecting, target }]) => {
				if (!isIntersecting) return // only trigger on enter
				if (activeIndex.value >= scrollStopTriggers.length - 1) {
					stop()
					return
				} // stop loop entirely if last segment
				if (scrollStopTriggers[activeIndex.value + 1].toggle) return // only trigger if next segment is not already active
				stop() // stop current observer
				blockScrolling()
			},
			{
				rootMargin: '1px', // fx: chrome bug
			}
		)
	}

	function next() {
		if (!scrollingBlocked.value) return
		activeIndex.value++
		toggleStopTrigger(activeIndex.value)
		enableScrolling()
		startLoop() // start new observer
	}

	function blockScrolling() {
		window.addEventListener('touchstart', blockEvent, {
			passive: false,
		})
		window.addEventListener('wheel', blockEvent, {
			passive: false,
		})
		scrollingBlocked.value = true
	}

	function enableScrolling() {
		window.removeEventListener('touchstart', blockEvent)
		window.removeEventListener('wheel', blockEvent)
		scrollingBlocked.value = false
	}

	// secondary
	function blockEvent(event: Event) {
		event.preventDefault()
	}

	return { scrollingBlocked, enter, exit, next }
}

export const useScrollStops = () => {
	// dependencies
	const { scrollStopTriggers, toggleStopTrigger, clearScrollStopTriggers } =
		useGlobalStore()
	const block = new BlockExceptionHandler('scroll-stops')

	// props
	const activeIndex = ref(0)
	const scrollingBlocked = ref(false)
	const activeStop = computed(() => {
		return scrollStopTriggers[activeIndex.value]
	})

	// controller
	function enter() {
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
			([{ isIntersecting }]) => {
				if (!isIntersecting) return // only trigger on enter
				if (activeIndex.value >= scrollStopTriggers.length - 1) {
					stop()
					return
				} // stop loop entirely if last segment
				if (scrollStopTriggers[activeIndex.value + 1].toggle) return // only trigger if next segment is not already active
				stop() // stop current observer
				// blockScrolling()
				blockScrolling()
			},
			{
				rootMargin: '1px', // fx: chrome bug
			},
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
		block.attachEvent('touchstart', window)
		block.attachEvent('wheel', window)
		scrollingBlocked.value = true
	}

	function enableScrolling() {
		block.detachEvent('touchstart', window)
		block.detachEvent('wheel', window)
		scrollingBlocked.value = false
	}

	onUnmounted(() => {
		enableScrolling()
	})

	return { scrollingBlocked, enter, exit, next }
}

export const useScrollSegments = () => {
	const isDebug = false // #rm

	// dependencies
	const { scrollSegmentTriggers, toggleScrollTrigger, getScrollTriggerIndex } =
		useGlobalStore()

	// initialization
	const scrollingBlocked = ref(false)
	const activeIndex = ref(0)
	const activeSegement = computed(() => {
		return scrollSegmentTriggers[activeIndex.value]
	})
	toggleScrollTrigger(activeIndex.value) // show first segment

	// loop
	startLoop()
	function startLoop() {
		const { stop } = useIntersectionObserver(
			activeSegement.value.target,
			([{ isIntersecting, target }]) => {
				if (isDebug)
					console.log(
						'isIntersecting:',
						isIntersecting,
						'at segment:',
						getScrollTriggerIndex(target)
					) // #rm
				if (!isIntersecting) return // only trigger on enter
				if (activeIndex.value >= scrollSegmentTriggers.length - 1) {
					if (isDebug) console.log('last segment reached') // #rm
					stop()
					return
				} // stop loop entirely if last segment
				if (scrollSegmentTriggers[activeIndex.value + 1].toggle) return // only trigger if next segment is not already active
				stop() // stop current observer
				blockScrolling()
			},
			{
				rootMargin: '1px', // fx: chrome bug
			}
		)
	}

	function completeStop() {
		if (!scrollingBlocked.value) return
		activeIndex.value++
		toggleScrollTrigger(activeIndex.value)
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
		if (isDebug) console.log('blocking event') // #rm
		event.preventDefault()
	}

	return { activeSegement, scrollingBlocked, completeStop }
}

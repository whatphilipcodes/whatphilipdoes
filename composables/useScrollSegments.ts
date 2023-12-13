export const useScrollSegments = () => {
	const isDebug = false // #rm

	// dependencies
	const { isScrolling } = useScroll(document)
	const { debounce } = useDebounce()
	const { scrollSegmentTriggers, toggleScrollTrigger, getScrollTriggerIndex } =
		useGlobalStore()

	// initialization
	const activeIndex = ref(0)
	const activeSegement = computed(() => {
		return scrollSegmentTriggers[activeIndex.value]
	})
	let stopScrollWatch: () => void
	let activeScrollTop: number
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
				activeScrollTop = activeSegement.value.target.offsetTop
				stop() // stop current observer
				blockScrolling()
				nextSegment()
			}
		)
	}

	// main
	function nextSegment() {
		setTimeout(() => {
			activeIndex.value++
			toggleScrollTrigger(activeIndex.value)
			enableScrolling()
			startLoop() // start new observer
		}, 5000)
	}

	function blockScrolling() {
		window.addEventListener('touchstart', blockEvent, {
			passive: false,
		})
		window.addEventListener('wheel', blockEvent, {
			passive: false,
		})
		stopScrollWatch = watch(isScrolling, (bool) => {
			if (bool) return
			dbScrollToActiveSegment()
		})
	}

	function enableScrolling() {
		stopScrollWatch?.()
		window.removeEventListener('touchstart', blockEvent)
		window.removeEventListener('wheel', blockEvent)
	}

	// secondary
	function blockEvent(event: Event) {
		if (isDebug) console.log('blocking event') // #rm
		event.preventDefault()
	}

	const dbScrollToActiveSegment = debounce(scrollToActiveSegment)
	function scrollToActiveSegment() {
		if (isDebug) console.log('scrolling to active segment...') // #rm
		window.scrollTo({
			top: activeScrollTop,
			behavior: 'smooth',
		})
	}
}

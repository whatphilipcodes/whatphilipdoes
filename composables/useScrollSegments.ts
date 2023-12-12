export const useScrollSegments = () => {
	// dependencies
	const { scrollSegmentTriggers, toggleScrollTrigger, getScrollTriggerIndex } =
		useGlobalStore()
	const { debounce } = useDebounce()

	// initialization
	const activeIndex = ref(0)
	toggleScrollTrigger(activeIndex.value) // show first segment

	// computed
	const activeSegement = computed(() => {
		return scrollSegmentTriggers[activeIndex.value]
	})
	const activeScrollTop = computed(() => {
		return activeSegement.value.target.offsetTop
	})

	// loop
	startLoop()
	function startLoop() {
		const { stop } = useIntersectionObserver(
			activeSegement.value.target,
			([{ isIntersecting, target }]) => {
				console.log(
					'isIntersecting:',
					isIntersecting,
					'at segment:',
					getScrollTriggerIndex(target)
				) // #rm
				if (!isIntersecting) return
				if (
					activeIndex.value >= scrollSegmentTriggers.length - 1 || // stop if last segment
					scrollSegmentTriggers[activeIndex.value + 1].toggle // only trigger if next segment is hidden
				)
					return
				stop() // stop current observer
				blockScrolling()
				nextSegment()
			}
		)
	}

	watch(activeSegement, (newValue) => {
		console.log('activeSegement:', newValue) // #rm
	})

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
		window.addEventListener('touchmove', blockEvent, {
			passive: false,
		})
		window.addEventListener('touchend', scrollToActiveSegment)
		window.addEventListener('wheel', dbScrollToActiveSegment)
		window.addEventListener('wheel', blockEvent, {
			passive: false,
		})
	}

	function enableScrolling() {
		window.removeEventListener('touchmove', blockEvent)
		window.removeEventListener('touchend', scrollToActiveSegment)
		window.removeEventListener('wheel', dbScrollToActiveSegment)
		window.removeEventListener('wheel', blockEvent)
	}

	// secondary
	function blockEvent(event: Event) {
		console.log('blocking event') // #rm
		event.preventDefault()
	}

	function scrollToActiveSegment() {
		console.log('scrolling to active segment') // #rm
		window.scrollTo({
			top: activeScrollTop.value,
			behavior: 'smooth',
		})
	}

	const dbScrollToActiveSegment = debounce(scrollToActiveSegment, 300)
}

export const useScrollSegments = () => {
	// dependencies
	const { scrollSegmentTriggers, toggleScrollTrigger, getScrollTriggerIndex } =
		useGlobalStore()

	// initialization
	const activeSegement = ref(0)
	toggleScrollTrigger(activeSegement.value) // show first segment

	// loop
	useIntersectionObserver(
		scrollSegmentTriggers.map((item) => {
			return item.target
		}),
		([{ isIntersecting, target }]) => {
			console.log(
				'isIntersecting:',
				isIntersecting,
				'at segment:',
				getScrollTriggerIndex(target)
			) // #rm
			// #todo: update active title based on segment

			if (!isIntersecting) return
			let index = getScrollTriggerIndex(target)
			if (
				index >= scrollSegmentTriggers.length - 1 ||
				scrollSegmentTriggers[index + 1].toggle // only trigger if next segment is hidden
			)
				return
			blockScrolling()
			nextSegment()
		}
	)

	watch(activeSegement, (newValue) => {
		console.log('activeSegement:', newValue) // #rm
	})

	// methods
	function nextSegment() {
		setTimeout(() => {
			activeSegement.value++
			toggleScrollTrigger(activeSegement.value)
			enableScrolling()
		}, 5000)
	}

	function blockScrolling() {
		window.addEventListener('touchmove', blockEvent, {
			passive: false,
		})
		window.addEventListener('wheel', blockEvent, {
			passive: false,
		})
	}

	function enableScrolling() {
		window.removeEventListener('touchmove', blockEvent)
		window.removeEventListener('wheel', blockEvent)
	}

	function blockEvent(event: Event) {
		console.log('blocking event')
		event.preventDefault()
	}
}

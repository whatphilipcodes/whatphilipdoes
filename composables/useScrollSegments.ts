export const useScrollSegments = () => {
	// props
	let stopObserver: () => void
	const { segmentTriggers, updateActiveSegment, getSegment } = useGlobalStore()
	const targets = computed(() => {
		return segmentTriggers.map((item) => item.target)
	})

	// controller
	function enter() {
		const { stop } = useIntersectionObserver(targets, onIntersection)
		stopObserver = stop
	}
	function exit() {
		stopObserver?.()
	}

	// internal callbacks
	const onIntersection = ([{ target, isIntersecting }]: any[]) => {
		if (!isIntersecting) return
		const el = target as Ref<HTMLElement>
		const segment = getSegment(el)
		if (segment) updateActiveSegment(segment.segment)
	}
	return {
		enter,
		exit,
	}
}

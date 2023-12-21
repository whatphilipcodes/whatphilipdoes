import type { pageSegment } from './useCustomTypes'

export const useScrollSegments = () => {
	// props
	let stopObserver: () => void
	const { segmentTriggers, updateActiveSegment, getSegment } = useGlobalStore()
	const intersectingSegments = ref<Partial<pageSegment>[]>([])

	// computed
	const targets = computed(() => {
		return segmentTriggers.map((item) => item.target)
	})

	// watcher
	watch(intersectingSegments.value, (val) => {
		const segment = val[0]
		if (segment) updateActiveSegment(segment)
		intersectingSegments.value.splice(3)
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
		const segment = getSegment(target)
		if (!segment) return
		if (isIntersecting) addIntersecting(segment)
	}

	// helpers
	function addIntersecting(segment: Partial<pageSegment>) {
		intersectingSegments.value.unshift(segment)
	}
	// function removeIntersecting(segment: Partial<pageSegment>) {
	// 	const index = intersectingSegments.value.findIndex(
	// 		(item) => item === segment
	// 	)
	// 	if (index < 0 || intersectingSegments.value.length === 1) return
	// 	intersectingSegments.value.splice(index, 1)
	// }

	return {
		enter,
		exit,
	}
}

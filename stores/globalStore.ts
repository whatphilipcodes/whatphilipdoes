export const useGlobalStore = defineStore('global', () => {
	// pages
	const activePage = ref<string>('what philip')
	function updateActivePage(page: string) {
		activePage.value = page
	}

	// segments
	const activeSegment = ref<Partial<pageSegment>>({
		name: 'does',
		buttons: [],
	})
	const segmentPositions = ref<
		{ enter: HTMLElement; exit: HTMLElement; segment: Partial<pageSegment> }[]
	>([])
	function addSegment(
		enter: HTMLElement,
		exit: HTMLElement,
		segment: Partial<pageSegment>,
	) {
		segmentPositions.value.push({ enter, exit, segment })
	}
	function updateActiveSegment(segment: Partial<pageSegment>) {
		Object.assign(activeSegment.value, segment)
	}
	const segmentCallbacks = ref<{ [key: string]: () => any }>({})
	function addSegmentCallback(name: string, callback: () => any) {
		segmentCallbacks.value[name] = callback
	}
	function executeSegmentCallback(name: string) {
		segmentCallbacks.value[name]?.()
	}
	function resetSegments() {
		segmentPositions.value.splice(0, segmentPositions.value.length)
	}

	// stops
	const scrollStopTriggers: {
		target: Ref<HTMLElement>
		toggle: Ref<boolean>
	}[] = []
	function addStopTrigger(target: Ref<HTMLElement>, toggle: Ref<boolean>) {
		scrollStopTriggers.push({ target, toggle })
	}
	function toggleStopTrigger(index: number) {
		scrollStopTriggers[index].toggle.value =
			!scrollStopTriggers[index].toggle.value
	}
	function getStopTriggerIndex(target: Element) {
		return scrollStopTriggers.findIndex((item) => item.target.value === target)
	}
	function clearScrollStopTriggers() {
		scrollStopTriggers.splice(0, scrollStopTriggers.length)
	}

	// static lvh
	const lvh = ref(0)
	function setLvh(window: Window) {
		lvh.value = window.screen.availHeight
	}

	// transitions
	const isTransitioning = ref(false)
	function setTransitioning(value: boolean) {
		isTransitioning.value = value
	}

	return {
		activePage,
		updateActivePage,
		//
		activeSegment,
		segmentPositions,
		addSegment,
		updateActiveSegment,
		segmentCallbacks,
		addSegmentCallback,
		executeSegmentCallback,
		resetSegments,
		//
		scrollStopTriggers,
		addStopTrigger,
		toggleStopTrigger,
		getStopTriggerIndex,
		clearScrollStopTriggers,
		//
		lvh,
		setLvh,
		//
		isTransitioning,
		setTransitioning,
	}
})

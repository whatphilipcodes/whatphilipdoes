export const useGlobalStore = defineStore('global', () => {
	// pages
	const activePage = ref<string>('what philip')
	function updateActivePage(page: string) {
		activePage.value = page
	}

	// segments
	const scrollSegments = ref<
		{ enter: number; exit: number; segment: Partial<pageSegment> }[]
	>([])
	const activeSegment = ref<Partial<pageSegment>>({
		name: 'does',
		buttons: [],
	})
	function addSegment(
		enter: number,
		exit: number,
		segment: Partial<pageSegment>,
	) {
		scrollSegments.value.push({ enter, exit, segment })
	}
	function updateActiveSegment(segment: Partial<pageSegment>) {
		Object.assign(activeSegment.value, segment)
	}
	const segmentCallbacks: { [key: string]: () => any } = {}
	function addSegmentCallback(name: string, callback: () => any) {
		segmentCallbacks[name] = callback
	}
	function executeSegmentCallback(name: string) {
		segmentCallbacks[name]?.()
	}
	function resetSegments() {
		scrollSegments.value.splice(0, scrollSegments.value.length)
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

	return {
		activePage,
		updateActivePage,
		//
		activeSegment,
		scrollSegments,
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
	}
})

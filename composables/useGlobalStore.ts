export const useGlobalStore = defineStore('global', () => {
	// pages
	const activePage = ref({
		title: 'index',
		prefix: 'what',
	})
	function updateActivePage(page: { title: string; prefix: string }) {
		activePage.value = page
	}

	// segments
	const scrollSegments = ref<
		{ enter: number; exit: number; segment: Partial<pageSegment> }[]
	>([])
	const activeSegment = ref<pageSegment>({
		title: 'does',
		buttons: [],
	})
	function addSegment(
		enter: number,
		exit: number,
		segment: Partial<pageSegment>
	) {
		scrollSegments.value.push({ enter, exit, segment })
	}
	function updateActiveSegment(segment: Partial<pageSegment>) {
		Object.assign(activeSegment.value, segment)
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
		//
		scrollStopTriggers,
		addStopTrigger,
		toggleStopTrigger,
		getStopTriggerIndex,
		clearScrollStopTriggers,
	}
})

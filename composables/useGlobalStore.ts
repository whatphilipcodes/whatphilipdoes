export const useGlobalStore = defineStore('global', () => {
	// stop triggers
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

	// segment triggers
	const segmentTriggers = ref<
		{ enter: HTMLElement; exit: HTMLElement; segment: Partial<pageSegment> }[]
	>([])

	const activeSegment = ref<pageSegment>({
		dynHeadPrefix: 'what',
		dynHeadHighlight: 'does',
		buttons: [],
	})
	function addSegment(
		enter: HTMLElement,
		exit: HTMLElement,
		segment: Partial<pageSegment>
	) {
		segmentTriggers.value.push({ enter, exit, segment })
	}
	function getSegment(target: HTMLElement) {
		return segmentTriggers.value.find((item) => item.enter === target)?.segment
	}
	function updateActiveSegment(segment: Partial<pageSegment>) {
		Object.assign(activeSegment.value, segment)
	}

	return {
		activeSegment,
		updateActiveSegment,
		scrollStopTriggers,
		addStopTrigger,
		toggleStopTrigger,
		getStopTriggerIndex,
		segmentTriggers,
		addSegment,
		getSegment,
	}
})

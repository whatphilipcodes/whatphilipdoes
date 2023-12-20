import type { pageSegment } from './useCustomTypes'

export const useGlobalStore = defineStore('global', () => {
	// state
	const activeSegment = ref<pageSegment>({
		dynamicHeader: {
			prefix: 'what',
			highlight: 'does',
		},
	})

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
	const segmentTriggers: {
		target: Ref<HTMLElement>
		segment: Ref<pageSegment>
	}[] = []
	function addSegmentTrigger(
		target: Ref<HTMLElement>,
		segment: Ref<pageSegment>
	) {
		segmentTriggers.push({ target, segment })
	}
	function getSegmentTriggerIndex(target: Element) {
		return segmentTriggers.findIndex((item) => item.target.value === target)
	}

	return {
		activeSegment,
		scrollStopTriggers,
		addStopTrigger,
		toggleStopTrigger,
		getStopTriggerIndex,
		segmentTriggers,
		addSegmentTrigger,
		getSegmentTriggerIndex,
	}
})

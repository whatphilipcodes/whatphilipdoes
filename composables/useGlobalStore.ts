import type { pageSegment } from './useCustomTypes'

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
	const segmentTriggers: Ref<
		{
			target: Ref<HTMLElement>
			segment: Ref<Partial<pageSegment>>
		}[]
	> = ref([])
	const activeSegment = ref<pageSegment>({
		dynHeadPrefix: 'what',
		dynHeadHighlight: 'does',
		buttons: [],
	})
	function addSegmentTrigger(
		target: Ref<HTMLElement>,
		segment: Ref<Partial<pageSegment>>
	) {
		segmentTriggers.value.push({ target, segment })
	}
	function getSegment(target: Ref<HTMLElement>) {
		return segmentTriggers.value.find((item) => item.target === target)
	}
	function updateActiveSegment(segment: Ref<Partial<pageSegment>>) {
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
		addSegmentTrigger,
		getSegment,
	}
})

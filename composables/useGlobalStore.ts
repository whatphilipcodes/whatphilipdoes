export const useGlobalStore = defineStore('global', () => {
	const scrollSegmentTriggers: {
		target: Ref<HTMLElement>
		toggle: Ref<boolean>
	}[] = []
	function addScrollTrigger(target: Ref<HTMLElement>, toggle: Ref<boolean>) {
		scrollSegmentTriggers.push({ target, toggle })
	}
	function toggleScrollTrigger(index: number) {
		scrollSegmentTriggers[index].toggle.value =
			!scrollSegmentTriggers[index].toggle.value
	}
	return { scrollSegmentTriggers, addScrollTrigger, toggleScrollTrigger }
})

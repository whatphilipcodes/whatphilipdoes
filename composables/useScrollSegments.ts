import type { WatchStopHandle } from 'vue'
export const useScrollSegments = () => {
	// props
	const store = useGlobalStore()
	const { y } = useWindowScroll()
	let cbUnwatch: WatchStopHandle

	const currentSegments = computed(() => {
		const center = y.value + window.innerHeight / 2
		const activeSegments = store.segmentPositions.filter(
			(segment) =>
				getDistFromEl(segment.enter) <= center &&
				getDistFromEl(segment.exit) >= center,
		)
		return activeSegments
	})

	function getDistFromEl(el: HTMLElement) {
		const rect: DOMRect = el.getBoundingClientRect()
		return Math.round(rect.top + window.scrollY)
	}

	onMounted(() => {
		cbUnwatch = watchImmediate(y, () => {
			const segment = currentSegments.value[0]?.segment
			if (!segment) {
				store.updateActiveSegment({
					buttons: [],
				})
				return
			}
			if (segment.callback) store.executeSegmentCallback(segment.callback)
			store.updateActiveSegment(segment)
		})
	})
	onBeforeUnmount(() => {
		store.resetSegments()
		cbUnwatch()
	})
}

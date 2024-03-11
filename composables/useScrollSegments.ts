import type { WatchStopHandle } from 'vue'
export const useScrollSegments = () => {
	// props
	const store = useGlobalStore()
	const { scrollSegments } = storeToRefs(store)
	const { y } = useWindowScroll()
	let cbUnwatch: WatchStopHandle

	watchImmediate(scrollSegments, () => {
		console.log('scrollSegments', scrollSegments)
	})

	//controller
	onMounted(() => {
		watchOnce(currentSegments, () => {
			if (y.value > 0) return // bandaid fix -> todo: proper handling
			store.updateActiveSegment(currentSegments.value[0]?.segment)
		})
		cbUnwatch = watch(y, () => {
			const segment = currentSegments.value[0]?.segment
			if (!segment) {
				// reset buttons
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

	// helpers
	const currentSegments = computed(() => {
		const center = y.value + window.innerHeight / 2
		const activeSegments = scrollSegments.value.filter(
			(segment) => segment.enter <= center && segment.exit >= center,
		)
		return activeSegments
	})
}

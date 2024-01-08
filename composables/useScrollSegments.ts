import type { WatchStopHandle } from 'vue'
export const useScrollSegments = () => {
	// props
	const { scrollSegments, updateActiveSegment } = useGlobalStore()
	const { y } = useWindowScroll()
	let cbUnwatch: WatchStopHandle

	//controller
	function enterScrollSegments() {
		watchOnce(currentSegments, (value: any) => {
			updateActiveSegment(value[0]?.segment)
		})
		cbUnwatch = watch(y, () => {
			updateActiveSegment(currentSegments.value[0]?.segment)
		})
	}
	function exitScrollSegments() {
		cbUnwatch()
	}

	// helpers
	const currentSegments = computed(() => {
		const center = y.value + window.innerHeight / 2
		const activeSegments = scrollSegments.filter(
			(segment) => segment.enter <= center && segment.exit >= center
		)
		return activeSegments
	})

	// return
	return { enterScrollSegments, exitScrollSegments }
}

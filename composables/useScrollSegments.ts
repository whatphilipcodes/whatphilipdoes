export const useScrollSegments = () => {
	// props
	const { scrollSegments, updateActiveSegment } = useGlobalStore()
	const { y } = useWindowScroll()

	// watcher
	watch(y, (val) => {
		const center = val + window.innerHeight / 2
		updateActiveSegment(getCurrentSegments(center)[0]?.segment)
	})

	// controller
	function enter() {}
	function exit() {}

	// helpers
	function getCurrentSegments(scrollY: number) {
		const activeSegments = scrollSegments.filter(
			(segment) => segment.enter <= scrollY && segment.exit >= scrollY
		)
		return activeSegments
	}

	return {
		enter,
		exit,
	}
}

export const useScrollSegments = () => {
	// dependencies
	const { scrollSegmentTriggers, toggleScrollTrigger } = useGlobalStore()

	// initialization
	const activeSegement = ref(0)
	toggleScrollTrigger(activeSegement.value)
	const { stop } = useIntersectionObserver(
		scrollSegmentTriggers[activeSegement.value].target,
		([{ isIntersecting, target }]) => {
			console.log('intersection observer', isIntersecting, target.id)
		},
		{
			rootMargin: '-100px 0px 0px 0px',
		}
	)
}

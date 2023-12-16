export const useWheelSwipe = (
	wheelUpCb: () => void,
	wheelDownCb: () => void
) => {
	const { cooldown } = useCooldown()

	let swipeDeltaY = 0
	function wheelCallback(event: WheelEvent) {
		event.preventDefault()
		if (event.deltaY === 0) swipeDeltaY = 0
		console.log('event.deltaY', event.deltaY, 'swipeDeltaY', swipeDeltaY)
		if (Math.abs(event.deltaY) > swipeDeltaY) {
			if (event.deltaY > 0) {
				cdWheelDownSwipe()
			} else if (event.deltaY < 0) {
				cdWheelUpSwipe()
			}
		}
		swipeDeltaY = Math.abs(event.deltaY)
	}
	const cdWheelUpSwipe = cooldown(wheelUpCb, 1000)
	const cdWheelDownSwipe = cooldown(wheelDownCb, 1000)

	// // remove default block
	// function removeDefaultBlock(event: WheelEvent, rmCallback: () => void) {
	// 	if (Math.abs(event.deltaY) < swipeDeltaY && event.deltaY !== 0) return
	// 	// rmCallback()
	// 	console.log('swipe over')
	// }

	return { wheelCallback }
}

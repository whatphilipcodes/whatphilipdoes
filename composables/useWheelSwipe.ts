export const useWheelSwipe = (
	eventHost: Window,
	cbSwipeUp: () => void,
	cbSwipeDown: () => void,
	msAvarageFrequency: number = 80,
	msInitOnRelease: number = 250,
	msThresholdDelay: number = 200,
	msCBCooldown: number = 100
) => {
	// intialize
	let fired: boolean
	let avarageDelta: number
	let deltaBuffer: number
	let deltaDivider: number
	init()

	// debug shit
	function debugPrint(event: WheelEvent) {
		console.log(
			'deltaY',
			event.deltaY.toFixed(2),
			'avarageDelta',
			avarageDelta.toFixed(2)
		)
		// console.log('avarageDelta', avarageDelta.toFixed(2))
	}

	// callback throttling
	const modCBSwipeUp = useThrottleFn(cbSwipeUp, msCBCooldown)
	const modCBSwipeDown = useThrottleFn(cbSwipeDown, msCBCooldown)

	// controller
	function enter() {
		eventHost.addEventListener('wheel', debugPrint as EventListener, {
			passive: false,
		})
		eventHost.addEventListener('wheel', avarageDeltaCallback as EventListener, {
			passive: false,
		})
		eventHost.addEventListener('wheel', swipeCallback as EventListener, {
			passive: false,
		})
		// eventHost.addEventListener('wheel', swipeThreshold as EventListener, {
		// 	passive: false,
		// })
		// eventHost.addEventListener('wheel', switchDirection as EventListener, {
		// 	passive: false,
		// })
		eventHost.addEventListener('wheel', modInit as EventListener, {
			passive: false,
		})
	}

	function exit() {}

	// main callbacks
	function avarageDeltaCallback(event: WheelEvent) {
		deltaBuffer += event.deltaY
		deltaDivider += 1
		modSetAvarageDelta()
	}

	function swipeCallback() {
		if (fired) return
		if (avarageDelta > 0) modCBSwipeDown()
		else if (avarageDelta < 0) modCBSwipeUp()
		fired = true
		engageThreshold()
	}

	// function switchDirection(event: WheelEvent) {
	// 	if (signsMatch(event.deltaY, avarageDelta)) return
	// 	console.log('switched direction', event.deltaY, avarageDelta)
	// 	init()
	// }

	// helpers
	function engageThreshold() {
		setTimeout(() => {
			eventHost.addEventListener('wheel', swipeThreshold as EventListener, {
				passive: false,
			})
		}, msThresholdDelay)
	}

	function swipeThreshold(event: WheelEvent) {
		if (Math.abs(event.deltaY) < Math.abs(avarageDelta)) return
		console.log('swipe threshold', event.deltaY, avarageDelta)
		eventHost.removeEventListener('wheel', swipeThreshold as EventListener)
		init()
	}

	const modSetAvarageDelta = useThrottleFn(setAvarageDelta, msAvarageFrequency)
	function setAvarageDelta() {
		avarageDelta = deltaBuffer / deltaDivider
		deltaDivider = 0
		deltaBuffer = 0
	}

	const modInit = useDebounceFn(init, msInitOnRelease)
	function init() {
		console.log('init')
		avarageDelta = 0
		deltaBuffer = 0
		deltaDivider = 0
		fired = false
	}

	// function signsMatch(current: number, previous: number): boolean {
	// 	return current * previous >= 0
	// }

	return { start: enter, stop: exit }
}

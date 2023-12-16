export const useWheelSwipe = (
	eventHost: Window,
	cbSwipeUp: () => void,
	cdSwipeDown: () => void,
	msAvarageFrequency: number = 100
) => {
	// intialize
	let avarageDelta: number
	let deltaBuffer: number
	let deltaDivider: number
	initValues()

	// debug shit
	let iterationCounter = 0
	function debugPrint(event: WheelEvent) {
		console.log(
			'deltaY',
			event.deltaY.toFixed(2),
			'avarageDelta',
			avarageDelta.toFixed(2),
			'iteration',
			iterationCounter
		)
		iterationCounter++
	}

	// controller
	function start() {
		eventHost.addEventListener('wheel', debugPrint as EventListener, {
			passive: false,
		})
		eventHost.addEventListener('wheel', swipeCallback as EventListener, {
			passive: false,
		})
		// eventHost.addEventListener('wheel', defaultBlock as EventListener, {
		// 	passive: false,
		// })
	}

	function stop() {
		// eventHost.removeEventListener('wheel', wheelCallback as EventListener)
		// eventHost.addEventListener('wheel', removeDefaultBlock as EventListener, {
		// 	passive: false,
		// })
	}

	function swipeCallback(event: WheelEvent) {
		deltaBuffer += event.deltaY
		deltaDivider += 1
		modSetAvarageDelta()
		modInitValues()
	}

	// helpers
	const modSetAvarageDelta = useThrottleFn(setAvarageDelta, msAvarageFrequency)
	function setAvarageDelta() {
		avarageDelta = deltaBuffer / deltaDivider
		deltaDivider = 0
		deltaBuffer = 0
	}

	const modInitValues = useDebounceFn(initValues, 600)
	function initValues() {
		avarageDelta = 0
		deltaBuffer = 0
		deltaDivider = 0
	}

	/**
	// callbacks
	function wheelCallback(event: WheelEvent) {
		if (event.deltaY > lastDelta) {
			console.log('swipe down') // #rm
			cdWheelDownSwipe()
		} else if (event.deltaY < lastDelta) {
			console.log('swipe up') // #rm
			cdWheelUpSwipe()
		}
		updateDelta(event.deltaY)
		// dbResetDelta()
	}

	function defaultBlock(event: WheelEvent) {
		event.preventDefault()
	}

	function removeDefaultBlock(event: WheelEvent) {
		if (Math.abs(event.deltaY) > Math.abs(lastDelta)) {
			eventHost.removeEventListener('wheel', defaultBlock as EventListener)
			eventHost.removeEventListener(
				'wheel',
				removeDefaultBlock as EventListener
			)
			console.log('stopped blocking deltaY') // #rm
		} else {
			console.log('still blocking') // #rm
		}
		updateDelta(event.deltaY)
	}

	// helpers
	function resetDelta() {
		console.log('reset delta') // #rm
		lastDelta = 0
	}

	function updateDelta(delta: number) {
		console.log('update delta') // #rm
		lastDelta = delta
	}

	

	const cdWheelUpSwipe = cooldown(cbSwipeUp, 1000)
	const cdWheelDownSwipe = cooldown(cdSwipeDown, 1000)
	const cdUpdateDelta = cooldown(updateDelta, 100)
	const dbResetDelta = debounce(resetDelta, 400)
	*/

	return { start, stop }
}

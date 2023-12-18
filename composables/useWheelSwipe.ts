export const useWheelSwipe = (
	eventHost: Window,
	cbSwipeUp: () => void,
	cbSwipeDown: () => void,
	cbAfterScroll: () => void = () => {},
	msDelayClear: number = 250,
	msAvarageFrequency: number = 80
) => {
	// intialize
	let fired: boolean
	let peaked: boolean
	let threshed: boolean
	let disposed: boolean
	let clearAll: boolean

	let avarageDelta: number
	let deltaBuffer: number
	let deltaDivider: number

	// controller
	function enter() {
		clearAll = false
		disposed = false
		clear()
		addListener(blockDefault)
		addListener(cbDataLoop)
		addListener(cbSwipeLoop)
		addListener(modClear)
	}

	function exit() {
		clearAll = true
	}

	const modClear = useDebounceFn(clear, msDelayClear)
	function clear() {
		if (clearAll && !disposed) {
			dispose()
			return
		}

		// event listeners
		removeListener(cbSwipeThresholdDetection)
		removeListener(cbDirectionSwitchDetection)

		// avarage delta
		avarageDelta = 0
		deltaBuffer = 0
		deltaDivider = 0

		// state
		fired = false
		peaked = false
		threshed = false
	}

	function dispose() {
		disposed = true
		cbAfterScroll?.()
		allListeners.forEach((cb) => removeListener(cb))
	}

	// primary callbacks
	function cbDataLoop(wheel: WheelEvent) {
		deltaBuffer += wheel.deltaY
		deltaDivider += 1
		modSetAvarageDelta()
	}

	function cbSwipeLoop(wheel: WheelEvent) {
		if (fired) return
		if (wheel.deltaY > 0) cbSwipeDown()
		else if (wheel.deltaY < 0) cbSwipeUp()
		fired = true
		addListener(cbPeakDetection)
		addListener(cbDirectionSwitchDetection)
	}

	// secondary callbacks
	function cbPeakDetection(wheel: WheelEvent) {
		if (peaked || Math.abs(wheel.deltaY) >= Math.abs(avarageDelta)) return
		peaked = true
		removeListener(cbPeakDetection)
		setTimeout(
			() => addListener(cbSwipeThresholdDetection),
			2 * msAvarageFrequency
		)
	}

	function cbDirectionSwitchDetection(wheel: WheelEvent) {
		if (signsMatch(wheel.deltaY, avarageDelta)) return
		clear()
	}

	function cbSwipeThresholdDetection(wheel: WheelEvent) {
		if (Math.abs(wheel.deltaY) <= Math.abs(avarageDelta)) return
		threshed = true
		clear()
	}

	// helpers
	const modSetAvarageDelta = useThrottleFn(setAvarageDelta, msAvarageFrequency)
	function setAvarageDelta() {
		avarageDelta = deltaBuffer / deltaDivider
		deltaDivider = 0
		deltaBuffer = 0
	}

	function blockDefault(wheel: WheelEvent) {
		wheel.preventDefault()
	}

	const allListeners: ((wheel: WheelEvent) => void)[] = []
	function addListener(cb: (wheel: WheelEvent) => void) {
		allListeners.push(cb)
		eventHost.addEventListener('wheel', cb as EventListener, { passive: false })
	}
	function removeListener(cb: (wheel: WheelEvent) => void) {
		eventHost.removeEventListener('wheel', cb as EventListener)
	}

	function signsMatch(a: number, b: number): boolean {
		return a * b >= 0
	}

	return { enter, exit }
}

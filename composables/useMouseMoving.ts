export const useMouseMoving = (host: Window, dbDelay: number = 200) => {
	const mouseMoving = ref(false)

	function stoppedListener() {
		mouseMoving.value = false
		host.removeEventListener('mousemove', dbStoppedListener)
		host.addEventListener('mousemove', restartListener)
	}
	const dbStoppedListener = useDebounceFn(stoppedListener, dbDelay)

	function restartListener() {
		mouseMoving.value = true
		host.removeEventListener('mousemove', restartListener)
		host.addEventListener('mousemove', dbStoppedListener)
	}

	function stop() {
		host.removeEventListener('mousemove', restartListener)
		host.removeEventListener('mousemove', dbStoppedListener)
	}

	host.addEventListener('mousemove', restartListener)

	return { mouseMoving, stop }
}

export const useScrollCallback = () => {
	/**
	 * Custom scrollTo with callback
	 * @param {number} top - The target scroll position.
	 * @param {Function} callback - The callback function to execute after scrolling.
	 */

	let scrollToInterval: NodeJS.Timeout | null = null
	let scrollPos: number
	let topRound: number

	let win: Window
	let cb: () => void

	function scrollToCb(top: number, callback: () => void) {
		// console.log('log, enter scrollToCb')
		cb = callback
		topRound = Math.round(top)

		if (scrollToInterval) clearInterval(scrollToInterval)
		scrollToInterval = setInterval(() => {
			let posRound = Math.round(win.scrollY)
			if (scrollPos != posRound) scrollPos = posRound
			else {
				win.scrollTo({ top: topRound, behavior: 'smooth' })
				scrollPos = posRound
			}
		}, 100)

		win.addEventListener('scroll', onScroll)
		onScroll()
	}

	function exitScrollToCb() {
		win.removeEventListener('scroll', onScroll)
		if (scrollToInterval) clearInterval(scrollToInterval)
		scrollToInterval = null
		cb = () => {}
		// console.log('log, exitScrollToCb')s
	}

	function onScroll() {
		if (Math.round(win.scrollY) === topRound) {
			win.removeEventListener('scroll', onScroll)
			if (scrollToInterval) clearInterval(scrollToInterval)
			scrollToInterval = null
			cb()
		}
	}

	onMounted(() => {
		win = window
	})

	onUnmounted(() => {
		exitScrollToCb()
	})

	return { scrollToCb, exitScrollToCb }
}

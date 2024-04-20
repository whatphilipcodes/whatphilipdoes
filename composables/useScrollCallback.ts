export const useScrollCallback = () => {
	/**
	 * Custom scrollTo with callback
	 * @param {number} top - The target scroll position.
	 * @param {Function} callback - The callback function to execute after scrolling.
	 */

	let scrollToInterval: NodeJS.Timeout | null = null
	let scrollPos: number
	let topRound: number

	function scrollToCb(win: Window, top: number, callback: () => void) {
		topRound = Math.round(top)

		function onScroll() {
			if (Math.round(win.scrollY) === topRound) {
				win.removeEventListener('scroll', onScroll)
				if (scrollToInterval) clearTimeout(scrollToInterval)
				scrollToInterval = null
				callback()
			}
		}

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
	return { scrollToCb }
}

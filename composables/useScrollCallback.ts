export const useScrollCallback = () => {
	/**
	 * Custom scrollTo with callback
	 * @param {number} top - The target scroll position.
	 * @param {Function} callback - The callback function to execute after scrolling.
	 */

	let scrollToInterval: NodeJS.Timeout | null = null
	let scrollPos: number

	function scrollToCb(win: Window, top: number, callback: () => void) {
		function onScroll() {
			if (win.scrollY === top) {
				win.removeEventListener('scroll', onScroll)
				if (scrollToInterval) clearTimeout(scrollToInterval)
				scrollToInterval = null
				callback()
			}
		}

		if (scrollToInterval) clearInterval(scrollToInterval)
		scrollToInterval = setInterval(() => {
			if (scrollPos != win.scrollY) scrollPos = win.scrollY
			else {
				win.scrollTo({ top: top, behavior: 'smooth' })
				scrollPos = win.scrollY
			}
		}, 100)

		win.addEventListener('scroll', onScroll)
		onScroll()
	}
	return { scrollToCb }
}

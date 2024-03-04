export const useScrollCallback = () => {
	/**
	 * Custom scrollTo with callback
	 * @param {number} top - The target scroll position.
	 * @param {Function} callback - The callback function to execute after scrolling.
	 */
	function scrollToCb(win: Window, top: number, callback: () => void) {
		const onScroll = function () {
			if (win.scrollY.toFixed() === top.toFixed()) {
				win.removeEventListener('scroll', onScroll)
				callback()
			}
		}
		win.addEventListener('scroll', onScroll)
		onScroll()
		win.scrollTo({ top: top, behavior: 'smooth' })
	}
	return { scrollToCb }
}

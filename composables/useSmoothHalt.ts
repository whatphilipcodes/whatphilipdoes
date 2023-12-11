export const useSmoothHalt = (context: Document) => {
	if (!context.scrollingElement) {
		console.warn(
			'scrollingElement is not available. Smooth halt will not work.'
		)
		return // Return early if scrollingElement is not available
	}

	function smoothHaltScroll(targetScrollTop: number) {
		let startScrollTop = context.scrollingElement?.scrollTop || 0
		let startTime: number = 0

		function step(time: number) {
			if (!startTime) startTime = time

			let progress = time - startTime
			let easeInOutCubic = progress < 500 ? Math.pow(progress / 500, 3) : 1

			if (context.scrollingElement) {
				context.scrollingElement.scrollTop =
					startScrollTop + (targetScrollTop - startScrollTop) * easeInOutCubic
			}

			if (progress < 500 && context.scrollingElement) {
				window.requestAnimationFrame(step)
			} else if (context.scrollingElement) {
				context.scrollingElement.scrollTop = targetScrollTop
			}
		}

		window.requestAnimationFrame(step)
	}

	return smoothHaltScroll
}

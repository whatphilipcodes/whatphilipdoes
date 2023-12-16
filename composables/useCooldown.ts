export const useCooldown = () => {
	const cooldown = (fn: Function, ms = 300) => {
		let lastExecutionTime: number | null = null

		return function (this: any, ...args: any[]) {
			const currentTime = Date.now()

			if (lastExecutionTime === null || currentTime - lastExecutionTime >= ms) {
				// Execute the function immediately
				fn.apply(this, args)
				lastExecutionTime = currentTime
			}
			// Ignore subsequent calls within the cooldown period
		}
	}

	return { cooldown }
}

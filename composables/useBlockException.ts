export class BlockExceptionHandler {
	private isActive: boolean = true
	private block: (event: Event) => void

	constructor() {
		this.block = this.blockHandler.bind(this) // Bind `this` context
	}

	private blockHandler(event: Event) {
		const target = event.target as HTMLElement
		if (this.isActive && !target?.classList.contains('persistent-default')) {
			event.preventDefault()
		}
	}

	attachEvent(eventName: string, target: EventTarget, passive = false) {
		target.addEventListener(eventName, this.block, { passive })
	}

	detachEvent(eventName: string, target: EventTarget) {
		target.removeEventListener(eventName, this.block)
	}

	deactivate() {
		this.isActive = false
	}
}

export class BlockExceptionHandler {
	private isActive: boolean = true
	private id: string
	private block: (event: Event) => void

	constructor(id: string) {
		this.id = id
		this.block = this.blockHandler.bind(this) // Bind 'this' context
	}

	// inject check for conditional blocking as parameter?
	private blockHandler(event: Event) {
		const target = event.target as HTMLElement
		if (this.isActive && !target?.classList.contains('persistent-default')) {
			console.log('blocked: ', this.id, '| event: ', event)
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

export function getElement(id: string): HTMLElement {
	const maybe = document.getElementById(id);
	if (!maybe) throw new Error(`Element not found: ${id}`);
	return maybe as HTMLElement;
}

export function isEventSupported(
	eventName: string,
	element: HTMLElement | Window | SVGElement = window,
): boolean {
	const eventProp = `on${eventName.toLowerCase()}`;
	return eventProp in element;
}

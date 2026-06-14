export const getElement = (id: string) => {
	const maybe = document.getElementById(id);
	if (!maybe) throw new Error(`Element not found: ${id}`);
	return maybe as HTMLElement;
};

export const isEventSupported = (
	eventName: string,
	element: HTMLElement | Window | SVGElement = window,
) => {
	const eventProp = `on${eventName.toLowerCase()}`;
	return eventProp in element;
};

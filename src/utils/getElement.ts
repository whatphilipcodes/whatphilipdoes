const getElement = (id: string) => {
	const maybe = document.getElementById(id);
	if (!maybe) throw new Error(`Element not found: ${id}`);
	return maybe as HTMLElement;
};
export { getElement };

export const useBlockException = (event: Event) => {
	const target = event.target as HTMLElement
	if (!target?.classList.contains('persistent-default')) event.preventDefault()
}

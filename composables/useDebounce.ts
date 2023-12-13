// thanks to https://decipher.dev/30-seconds-of-typescript/docs/debounce/
export const useDebounce = () => {
	const debounce = (fn: Function, ms = 300) => {
		let timeoutId: ReturnType<typeof setTimeout>
		return function (this: any, ...args: any[]) {
			clearTimeout(timeoutId)
			timeoutId = setTimeout(() => fn.apply(this, args), ms)
		}
	}
	return { debounce }
}

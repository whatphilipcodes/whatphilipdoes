export const useDisplayResolution = () => {
	const width = ref<number>(0)
	const height = ref<number>(0)

	function setRes(window: Window) {
		width.value = window.screen.width
		height.value = window.screen.height
	}

	return { setRes, width, height }
}

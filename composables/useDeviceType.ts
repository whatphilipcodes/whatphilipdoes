export const useDeviceType = () => {
	const result = ref('')
	onMounted(() => {
		window.addEventListener('wheel', cbMouse)
		window.addEventListener('touchstart', cbTouch)
	})
	function cbMouse() {
		result.value = 'mouse'
	}
	function cbTouch() {
		result.value = 'touch'
	}
	return result
}

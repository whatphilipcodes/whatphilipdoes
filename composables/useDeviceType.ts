export const useInputType = () => {
	const result = ref('touch')
	onMounted(() => {
		window.addEventListener('wheel', cbMouse)
	})
	function cbMouse() {
		result.value = 'mouse'
		window.removeEventListener('wheel', cbMouse)
	}
	return result
}

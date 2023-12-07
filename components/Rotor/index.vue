<template>
	<div
		id="projectDisplay"
		ref="projectDisplay"
		class="justify-self-center w-screen h-screen overflow-hidden relative bg-error"
	>
		<RotorSlide />
		<RotorSlide :translate="test" />
		<RotorSlide />
	</div>
</template>

<script setup lang="ts">
const test = ref('')
const projectDisplay = ref<HTMLElement | null>(null)
const { direction, isSwiping, lengthY } = useSwipe(projectDisplay)
const stop = watch(
	() => isSwiping.value,
	(newValue) => {
		test.value = '-translate-y-full'
		console.log('isSwiping changed:', newValue)
		console.log('direction:', direction.value)
		stop()
	}
)

onMounted(() => {
	console.log('test:', test.value)
})
</script>

<style scoped></style>

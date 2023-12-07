<template>
	<div
		id="projectDisplay"
		ref="projectDisplay"
		class="w-screen h-screen overflow-hidden relative bg-error"
	>
		<div class="absolute top-full w-full h-full bg-cinnabar-500"></div>
		<div
			ref="test"
			class="absolute top-full transition-transform duration-1000 ease-in-out w-full h-full bg-cinnabar-400"
		></div>
		<div class="absolute top-full w-full h-full bg-cinnabar-300"></div>
	</div>
</template>

<script setup lang="ts">
const projectDisplay = ref<HTMLElement | null>(null)
const test = ref<HTMLElement | null>(null)
const { direction, isSwiping, lengthY } = useSwipe(projectDisplay)
const stop = watch(
	() => isSwiping.value,
	(newValue) => {
		test.value?.classList.add('-translate-y-[100%]')
		console.log('isSwiping changed:', newValue)
		console.log('direction:', direction.value)
		stop()
	}
)
</script>

<style scoped></style>

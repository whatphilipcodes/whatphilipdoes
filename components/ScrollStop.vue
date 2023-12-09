<template>
	<div class="w-full z-front" ref="triggerElement"></div>
	<slot />
</template>

<script setup lang="ts">
const { scrollStopperCollection, addScrollStop } = useGlobalStore()
const triggerElement = ref<HTMLElement | null>(null)
onMounted(() => {
	if (triggerElement.value) {
		addScrollStop(triggerElement)
		console.log(scrollStopperCollection)
	}
})
</script>

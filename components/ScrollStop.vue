<template>
	<div class="z-front col-span-full" ref="triggerElement" />
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

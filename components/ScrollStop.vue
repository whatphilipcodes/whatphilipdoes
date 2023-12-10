<template>
	<div class="col-span-full">
		<div class="z-front" ref="triggerElement" />
		<slot />
	</div>
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

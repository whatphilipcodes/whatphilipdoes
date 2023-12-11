<template>
	<div class="col-span-full w-screen justify-self-center">
		<div class="z-front" ref="triggerElement" />
		<slot />
	</div>
</template>

<script setup lang="ts">
const { addScrollStop } = useGlobalStore()
const triggerElement = ref()
onMounted(() => {
	addScrollStop(triggerElement)
})
</script>

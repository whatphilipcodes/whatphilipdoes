<template>
	<div class="z-front" ref="triggerNext" />
</template>

<script setup lang="ts">
const { addStopTrigger } = useGlobalStore()

const isRendering = ref(false)
const triggerNext = ref()

onMounted(() => {
	addStopTrigger(triggerNext, isRendering)
})
</script>

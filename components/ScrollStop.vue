<template>
	<slot v-if="isRendering" />
	<div class="z-front" ref="triggerNext" />
</template>

<script setup lang="ts">
const { addScrollTrigger } = useGlobalStore()

const isRendering = ref(false)
const triggerNext = ref()

onMounted(() => {
	addScrollTrigger(triggerNext, isRendering)
})
</script>

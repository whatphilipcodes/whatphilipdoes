<template>
	<slot v-if="isRendering" />
	<div class="z-front col-span-full" ref="triggerNext" />
</template>

<script setup lang="ts">
const store = useGlobalStore()
const isRendering = ref(false)
const triggerNext = ref()

onMounted(() => {
	store.addStopTrigger(triggerNext, isRendering)
})
</script>

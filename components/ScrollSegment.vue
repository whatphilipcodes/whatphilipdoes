<template>
	<slot v-if="isRendering" />
	<div class="z-front" ref="triggerNext" :id="segmentTitle" />
</template>

<script setup lang="ts">
defineProps({
	segmentTitle: {
		type: String,
		required: true,
	},
})

const { addScrollTrigger } = useGlobalStore()

const isRendering = ref(false)
const triggerNext = ref()

onMounted(() => {
	addScrollTrigger(triggerNext, isRendering)
})
</script>

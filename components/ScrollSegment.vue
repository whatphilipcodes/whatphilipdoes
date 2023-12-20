<template>
	<div class="z-front" ref="trigger" />
</template>

<script setup lang="ts">
const props = defineProps({
	headerPrefix: {
		type: String,
		default: 'error: no prefix',
	},
	headerHighlight: {
		type: String,
		default: 'error: no highlight',
	},
	buttonArray: {
		type: Array<{ label: string; to: string }>,
		default: () => [{ label: 'error: no buttons', to: '' }],
	},
	pageSegment: {
		type: Object as PropType<pageSegment>,
		default: () => ({} as pageSegment),
	},
})
const { addSegmentTrigger } = useGlobalStore()
const trigger = ref()
const computedSegment = computed(() => {
	return {
		dynamicHeader: {
			prefix: props.headerPrefix,
			highlight: props.headerHighlight,
		},
		buttons: props.buttonArray,
	} as pageSegment
})

const segment = computed(() => {
	return props.pageSegment.dynamicHeader
		? props.pageSegment
		: computedSegment.value
})

onMounted(() => {
	addSegmentTrigger(trigger, segment)
})
</script>

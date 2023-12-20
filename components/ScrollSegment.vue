<template>
	<div class="z-front" ref="trigger" />
</template>

<script setup lang="ts">
const trigger = ref()
const { addSegmentTrigger } = useGlobalStore()
const props = defineProps({
	dynHeadPrefix: {
		type: String,
		default: undefined,
	},
	dynHeadHighlight: {
		type: String,
		default: undefined,
	},
	buttons: {
		type: Array<{ label: string; to: string }>,
		default: undefined,
	},
	pageSegment: {
		type: Object as PropType<Partial<pageSegment>>,
		default: undefined,
	},
})

const segment = computed(() => {
	if (props.pageSegment) {
		return props.pageSegment
	} else {
		return {
			...(props.dynHeadPrefix && {
				dynHeadPrefix: props.dynHeadPrefix,
			}),
			...(props.dynHeadHighlight && {
				dynHeadHighlight: props.dynHeadHighlight,
			}),
			...(props.buttons && {
				buttons: props.buttons,
			}),
		} as Partial<pageSegment>
	}
})

onMounted(() => {
	addSegmentTrigger(trigger, segment)
})
</script>

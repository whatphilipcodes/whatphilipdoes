<template>
	<div class="z-front col-span-full" ref="enter" />
	<slot />
	<div class="z-front col-span-full" ref="exit" />
</template>

<script setup lang="ts">
const enter = ref()
const exit = ref()

const { addSegment } = useGlobalStore()

const props = defineProps({
	title: {
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
			...(props.title && {
				title: props.title,
			}),
			...(props.buttons && {
				buttons: props.buttons,
			}),
		} as Partial<pageSegment>
	}
})

onMounted(() => {
	addSegment(enter.value.offsetTop, exit.value.offsetTop, segment.value)
})
</script>

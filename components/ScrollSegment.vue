<template>
	<div class="z-front col-span-full" ref="enter" />
	<slot />
	<div class="z-front col-span-full" ref="exit" />
</template>

<script setup lang="ts">
const enter = ref<HTMLElement>()
const exit = ref<HTMLElement>()

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
	const enterRect = enter.value?.getBoundingClientRect()
	const exitRect = exit.value?.getBoundingClientRect()
	if (enterRect && exitRect) {
		console.log(
			Math.round(enterRect.top + window.scrollY),
			Math.round(exitRect.top + window.scrollY),
		)
		addSegment(
			Math.round(enterRect.top + window.scrollY),
			Math.round(exitRect.top + window.scrollY),
			segment.value,
		)
	} else {
		throw new Error(
			`ScrollSegment: enter:${enter.value} or exit:${exit.value} element did not have boundingClientRect.`, // does this make sense?
		)
	}
})
</script>

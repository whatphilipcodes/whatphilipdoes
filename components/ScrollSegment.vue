<template>
	<div class="z-front col-span-full" ref="elEnter" />
	<slot />
	<div class="z-front col-span-full" ref="elExit" />
</template>

<script setup lang="ts">
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

const elEnter = ref<HTMLElement>()
const elExit = ref<HTMLElement>()

const enter = computed(() => {
	if (!elEnter.value) return 0
	const rect: DOMRect = elEnter.value?.getBoundingClientRect()
	return Math.round(rect.top)
})

const exit = computed(() => {
	if (!elExit.value) return 0
	const rect: DOMRect = elExit.value?.getBoundingClientRect()
	return Math.round(rect.top)
})

onMounted(() => {
	addSegment(enter, exit, segment.value)

	// setInterval(() => {
	// 	console.log('enter', enter.value)
	// 	console.log('exit', exit.value)
	// }, 3000)
})

// onMounted(() => {
// if (enter && exit) {
// 	addSegment(
// 		Math.round(enterRect.top + window.scrollY),
// 		Math.round(exitRect.top + window.scrollY),
// 		segment.value,
// 	)
// } else {
// 	throw new Error(
// 		`ScrollSegment: enter:${enter.value} or exit:${exit.value} element did not have boundingClientRect.`, // does this make sense?
// 	)
// }
// })
</script>

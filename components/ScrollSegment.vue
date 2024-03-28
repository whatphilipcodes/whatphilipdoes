<template>
	<div class="z-front col-span-full" ref="elEnter" />
	<slot />
	<div class="z-front col-span-full" ref="elExit" />
</template>

<script setup lang="ts">
const store = useGlobalStore()
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

onMounted(() => {
	if (!elEnter.value || !elExit.value)
		throw new Error(
			'there seems to be an issue with one of the scrollSegment component instances. elEnter: ' +
				elEnter.value +
				' elExit: ' +
				elExit.value,
		)
	store.addSegment(elEnter.value, elExit.value, segment.value)
})
</script>

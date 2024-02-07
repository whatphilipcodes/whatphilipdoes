<template>
	<div v-if="device === 'mouse'" data-info="open-case-overlay" class="group">
		<div
			ref="floatingItem"
			class="fixed transition delay-75 ease-in-out will-change-transform"
			:class="{
				'scale-50 opacity-0':
					isAnimating || !isActive || !mouseAtZero || !mouseMoving,
				'scale-100 opacity-100':
					!isAnimating && isActive && mouseAtZero && mouseMoving,
			}"
			:style="{
				left: `${x + 24}px`,
				top: `${y - displace.y + 24}px`,
			}"
		>
			<div class="flex h-4 w-fit flex-row items-center gap-4">
				<div class="w-fit text-cinnabar-500">click to open</div>
			</div>
		</div>
		<NuxtLink
			v-if="isActive"
			ref="clickable"
			class="absolute h-full w-full"
			:to="props.activeCase._path"
		/>
	</div>
	<LayoutColumns
		v-else-if="showUI"
		class="fixed bottom-0 hidden w-screen py-8 transition delay-75 ease-in-out lg:block"
		:class="{
			'opacity-0': isAnimating,
			'opacity-100': !isAnimating,
		}"
	>
		<div class="col-span-full flex h-10 flex-row justify-end">
			<Button variant="accent" :to="props.activeCase._path" class="w-44"
				>open case</Button
			>
		</div>
	</LayoutColumns>
</template>

<script setup lang="ts">
// imports
import type { UseMouseEventExtractor } from '@vueuse/core'

// props
const props = defineProps({
	activeCase: {
		type: Object as PropType<contentProject>,
		required: true,
	},
	isActive: {
		type: Boolean,
		required: true,
	},
	isAnimating: {
		type: Boolean,
		required: true,
	},
	showRestartUI: {
		type: Boolean,
		required: true,
	},
	showUI: {
		type: Boolean,
		required: true,
	},
	cbRestart: {
		type: Function as PropType<() => void>,
		required: true,
	},
})

// pos props
const floatingItem = ref()
const displace = computed(() => {
	if (floatingItem.value) {
		const { width, height } = floatingItem.value.getBoundingClientRect()
		return {
			x: width * 0.5,
			y: height * 0.5,
		}
	} else {
		return {
			x: 0,
			y: 0,
		}
	}
})

// mouse coordinates
const clickable = ref()
const extractor: UseMouseEventExtractor = (event) => {
	if (event instanceof MouseEvent) return [event.offsetX, event.offsetY]
	else return null
}
const { x, y } = useMouse({ target: clickable, type: extractor, touch: false })
const device = useDeviceType()

const mouseAtZero = computed(() => {
	return x.value !== 0 && y.value !== 0
})
const { mouseMoving, stop: stopMouseMoving } = useMouseMoving(window, 400)

// update touchbuttons in store
const { updateActiveSegment, addSegmentCallback } = useGlobalStore()
const touchbuttons = computed(() => {
	if (props.showRestartUI)
		return {
			buttons: [
				{
					label: 'show again',
					to: props.cbRestart,
				},
			],
		}
	return {
		buttons: [
			{
				label: 'open work',
				variant: 'accent',
				to: props.activeCase._path ?? '/404',
			},
		],
	}
})
const stop = watch(touchbuttons, () => {
	updateActiveSegment(touchbuttons.value)
})
addSegmentCallback('getRotorButtons', () => {
	updateActiveSegment(touchbuttons.value)
})

// cleanup
onUnmounted(() => {
	stop()
	stopMouseMoving()
})
</script>

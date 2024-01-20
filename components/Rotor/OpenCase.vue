<template>
	<div v-if="device === 'mouse'" data-info="open-case-overlay" class="group">
		<div
			ref="floatingItem"
			class="fixed will-change-transform transition ease-in-out delay-75"
			:class="{
				'opacity-0 scale-50':
					isAnimating || !isActive || !mouseAtZero || !mouseMoving,
				'opacity-100 scale-100':
					!isAnimating && isActive && mouseAtZero && mouseMoving,
			}"
			:style="{
				left: `${x + 24}px`,
				top: `${y - displace.y + 24}px`,
			}"
		>
			<!-- <div
				class="flex w-44 h-10 items-center gap-4 border border-cinnabar-500 justify-center"
			>
				<div class="text-cinnabar-500">click to open</div>
			</div> -->
			<div class="flex flex-row w-fit h-4 items-center gap-4">
				<div class="w-fit text-cinnabar-500">click to open</div>
			</div>
		</div>
		<NuxtLink
			v-if="isActive"
			ref="clickable"
			class="absolute w-full h-full"
			:to="props.activeCase._path"
		/>
	</div>
	<LayoutColumns
		v-else-if="isActive"
		class="hidden lg:block fixed transition ease-in-out delay-75 bottom-0 w-screen py-8"
		:class="{
			'opacity-0': isAnimating || !isActive,
			'opacity-100': !isAnimating && isActive,
		}"
	>
		<div class="flex flex-row col-span-full h-10 justify-end">
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
const device = useInputType()

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
				label: 'open case',
				accent: true,
				to: props.activeCase._path ?? '',
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

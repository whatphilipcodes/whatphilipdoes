<template>
	<div v-if="device === 'mouse'" id="open-case-overlay" class="group">
		<div
			ref="floatingItem"
			class="fixed will-change-transform transition ease-in-out delay-75"
			:class="{
				'opacity-0 scale-50': isAnimating || !isActive,
				'opacity-100 scale-100': !isAnimating && isActive,
			}"
			:style="{
				left: `${x + 20}px`,
				top: `${y - displace.y + 20}px`,
			}"
		>
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
const { x, y } = useMouse({ target: clickable, type: extractor })
const device = useInputType()

// update touchbuttons in store
const { updateActiveSegment } = useGlobalStore()
const touchbutton = computed(() => {
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
watch(touchbutton, () => {
	updateActiveSegment(touchbutton.value)
})
</script>

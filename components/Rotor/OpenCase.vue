<template>
	<div v-if="device === 'mouse'" id="open-case-overlay" class="group">
		<div
			v-if="x + y > 0"
			ref="floatingItem"
			class="fixed will-change-transform transition ease-in-out opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100"
			:style="{
				left: `${x + 20}px`,
				top: `${y - displace.y + 20}px`,
			}"
		>
			<div class="flex flex-row w-fit h-4 items-center gap-4">
				<div class="w-fit text-cinnabar-500">click to open</div>
				<!-- <SvgoArrow
					class="w-fit h-full stroke-1 fill-none stroke-cinnabar-500"
					:fontControlled="false"
					:filled="true"
				/> -->
			</div>
		</div>
		<NuxtLink
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
</script>

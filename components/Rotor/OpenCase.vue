<template>
	<div v-if="isActive && device === 'mouse'" class="group">
		<div
			ref="floatingItem"
			class="fixed invisible group-hover:visible"
			:style="{
				left: `${x + 24}px`,
				top: `${y - displace.y}px`,
			}"
		>
			<div class="flex flex-row w-44 h-4 items-center justify-start gap-4">
				<div class="w-fit text-cinnabar-500">click to open</div>
				<SvgoArrow
					class="w-fit h-full stroke-1 fill-none stroke-cinnabar-500"
					:fontControlled="false"
					:filled="true"
				/>
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

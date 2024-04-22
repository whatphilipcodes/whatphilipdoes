<template>
	<div
		data-info="sm-container"
		class="relative col-span-full w-lvw justify-self-center md:hidden"
	>
		<div data-info="sm-caroussel" v-if="props.imageArray.length > 1">
			<div
				class="flex h-fit flex-row gap-x-4 overflow-y-clip overflow-x-scroll px-4"
				ref="scrollContainer"
			>
				<div
					v-for="(image, index) in props.imageArray"
					:key="index"
					class="h-[28rem]"
					:class="image.smnarrow ? 'min-w-[100vw]' : 'aspect-landscape'"
				>
					<Image :src="image.src" :alt="image.alt" />
				</div>
			</div>
			<ScrollPromptBase
				:active="active"
				direction="left-right"
				class="absolute bottom-1/2 right-1/3 z-[1] w-2/3"
			/>
		</div>
		<div data-info="sm-single" class="flex h-fit overflow-hidden px-4" v-else>
			<div
				class="w-full"
				:class="props.imageArray[0].smnarrow ? 'h-[28rem]' : 'aspect-landscape'"
			>
				<Image :src="props.imageArray[0].src" :alt="props.imageArray[0].alt" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
const props = defineProps({
	imageArray: {
		type: Array as PropType<imageData[]>,
		default: [],
		required: true,
	},
})

// scroll prompt
const active = ref(false)
onMounted(() => {
	active.value = true
})
const scrollContainer = ref<HTMLElement>()
const { x } = useScroll(scrollContainer)
const stop = watch(x, (val) => {
	if (val > 80) {
		active.value = false
		stop()
	}
})
</script>

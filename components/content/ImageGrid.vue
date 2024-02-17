<template>
	<div
		data-info="image-grid-container"
		class="col-span-full hidden auto-rows-[40vh] grid-cols-8 gap-4 md:grid lg:grid-cols-12"
	>
		<div
			v-for="(image, index) in props.imageArray"
			:key="index"
			:class="getGridClasses(image)"
		>
			<Image :src="image.src" :alt="image.alt" />
		</div>
	</div>
</template>

<script setup lang="ts">
const props = defineProps({
	imageArray: {
		type: Array as PropType<imageData[]>,
		required: true,
	},
})

function getGridClasses(image: imageData) {
	const spans = utils.getGridSpans(image)
	const starts = utils.getGridStarts(image)
	return starts + ' ' + spans
}
</script>

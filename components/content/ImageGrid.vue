<template>
	<div
		data-info="image-grid-container"
		class="col-span-full hidden md:grid auto-rows-[40vh] grid-cols-8 lg:grid-cols-12 gap-4"
	>
		<div
			v-for="(image, index) in props.imageArray"
			:key="index"
			:class="utils.getGridSpans(image)"
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
</script>

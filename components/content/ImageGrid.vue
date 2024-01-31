<template>
	<div
		data-info="image-grid-container"
		class="col-span-full hidden md:grid auto-rows-[40vh] grid-cols-8 lg:grid-cols-12 gap-4"
	>
		<div
			v-for="(image, index) in props.imageArray"
			:key="index"
			:class="getGridSpans(image)"
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

function getGridSpans(image: imageData): string {
	const { md: mdCol, lg: lgCol } = getSeperateSpans(image.cols ?? '1 / 1')
	const { md: mdRow, lg: lgRow } = getSeperateSpans(image.rows ?? '1 / 1')
	return `col-span-${mdCol} lg:col-span-${lgCol} row-span-${mdRow} lg:row-span-${lgRow}`
}

function getSeperateSpans(input: string): { md: string; lg: string } {
	const [md, lg] = input.split('/').map((item) => item.trim())
	return { md, lg }
}
</script>

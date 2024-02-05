<template>
	<div class="col-span-full grid grid-cols-8 lg:grid-cols-12 gap-4">
		<ImageCaroussel :imageArray="props.imageArray" />
		<ImageGrid :imageArray="props.imageArray" />
		<div
			v-if="slots.default"
			data-info="description"
			class="col-start-1 col-span-full md:col-span-5 lg:col-span-7 text-mono-300 hyphens-auto"
		>
			<ContentSlot unwrap="p" />
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
const slots = useSlots()
</script>

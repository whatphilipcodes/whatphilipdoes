<template>
	<div class="col-span-full grid grid-cols-8 gap-4 lg:grid-cols-12">
		<ImageCaroussel :imageArray="props.imageArray" />
		<ImageGrid :imageArray="props.imageArray" />
		<div
			v-if="slots.default"
			data-info="description"
			class="col-span-full col-start-1 hyphens-auto text-pretty text-mono-300 md:col-span-5 lg:col-span-7"
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

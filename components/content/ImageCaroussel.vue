<template>
	<div
		data-info="sm-container"
		class="md:hidden w-screen col-span-full justify-self-center"
	>
		<div
			data-info="sm-caroussel"
			class="flex flex-row h-fit overflow-x-scroll gap-x-4 px-4"
			v-if="props.imageArray.length > 1"
		>
			<div
				v-for="(image, index) in props.imageArray"
				:key="index"
				class="h-[56vh]"
				:style="'min-width: 100vw'"
			>
				<Image :src="image.src" :alt="image.alt" />
			</div>
		</div>
		<div data-info="sm-single" class="flex h-fit overflow-hidden px-4" v-else>
			<div class="w-full h-[64vh]">
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
</script>

<style scoped></style>

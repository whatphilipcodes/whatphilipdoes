<template>
	<div
		data-info="sm-container"
		class="col-span-full w-screen justify-self-center md:hidden"
	>
		<div
			data-info="sm-caroussel"
			class="flex h-fit flex-row gap-x-4 overflow-y-clip overflow-x-scroll px-4"
			v-if="props.imageArray.length > 1"
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
</script>

<style scoped></style>

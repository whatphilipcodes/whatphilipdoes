<template>
	<div
		data-info="sm-container"
		class="md:hidden w-screen col-span-full justify-self-center"
	>
		<div
			data-info="sm-carousel"
			class="flex flex-row h-fit overflow-x-scroll gap-x-4 px-4"
			v-if="props.imageArray.length > 1"
		>
			<div
				v-for="(image, index) in props.imageArray"
				:key="index"
				class="h-[64vh]"
				:class="getAspectClassesSM(image)"
			>
				<Image :src="image.src" :alt="image.alt" />
			</div>
		</div>
		<div data-info="sm-single" class="flex h-fit overflow-hidden px-4" v-else>
			<div class="h-[64vh] w-full">
				<Image :src="props.imageArray[0].src" :alt="props.imageArray[0].alt" />
			</div>
		</div>
		<LayoutColumns class="w-full h-fit my-4 md:my-6 lg:my-8">
			<div v-if="description" class="col-span-full text-mono-300">
				{{ props.description }}
			</div>
		</LayoutColumns>
	</div>
	<div
		data-info="md-grid"
		class="hidden md:flex flex-row flex-wrap col-span-full h-fit gap-4"
	>
		<div
			v-for="(image, index) in props.imageArray"
			:key="index"
			class="h-[32vh] lg:h-[40vh]"
			:class="getAspectClassesLG(image)"
		>
			<Image :src="image.src" :alt="image.alt" />
		</div>
		<div
			v-if="description"
			class="flex flex-1 min-w-[32vw] max-w-[64vw] text-mono-300"
		>
			{{ props.description }}
		</div>
	</div>
</template>

<script setup lang="ts">
// props
const props = defineProps({
	imageArray: {
		type: Array as PropType<imageData[]>,
		default: [],
		required: true,
	},
	description: {
		type: String,
		default: undefined,
		required: false,
	},
})

// helpers (#info: in-template operations did not work)
function getAspectClassesLG(image: imageData) {
	if (image.format) {
		return 'aspect-[' + image.format + ']'
	} else {
		return 'min-w-[32vw] max-w-[48vw]'
	}
}
function getAspectClassesSM(image: imageData) {
	if (image.format) {
		return 'aspect-[' + image.format + ']'
	} else {
		return 'min-w-[100vw]'
	}
}
</script>

<template>
	<div class="flex flex-row flex-wrap col-span-full gap-4">
		<div
			v-for="(image, index) in props.imageArray"
			:key="index"
			:class="`h-[40vh]` + (image.wide ? ` aspect-[4/3]` : ` aspect-[3/4]`)"
		>
			<NuxtPicture
				format="webp"
				:src="image.src"
				:imgAttrs="{ class: 'w-full h-full object-cover' }"
			/>
		</div>
	</div>
	<div v-if="description" class="pt-4 text-mono-300 col-span-full">
		{{ props.description }}
	</div>
</template>

<script setup lang="ts">
const props = defineProps({
	imageArray: {
		type: Array as PropType<{ src: string; alt?: string; wide?: boolean }[]>,
		default: [],
		required: true,
	},
	description: {
		type: String,
		default: undefined,
		required: false,
	},
})
</script>

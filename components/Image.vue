<template>
	<!-- <NuxtPicture
		format="webp"
		fit="cover"
		:src="props.src"
		:alt="props.alt"
		:imgAttrs="{ class: 'w-full h-full object-cover' }"
	/> -->
	<img :src="props.src" :alt="props.alt" class="w-full h-full object-cover" />
</template>

<script setup lang="ts">
const props = defineProps({
	src: {
		type: String,
		required: true,
	},
	alt: {
		type: String,
		required: false,
	},
})

// sizes="100vw sm:50vw md:400px"
// densities="x1 x2"
</script>

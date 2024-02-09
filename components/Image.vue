<template>
	<nuxt-img
		:src="props.src"
		:alt="props.alt"
		class="h-full w-full bg-mono-900 object-cover"
		sizes="100vw lg:1440px"
		densities="x1 x2"
		quality="80"
	/>
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
</script>

<template>
	<img
		:src="props.src"
		:alt="props.alt"
		class="w-full h-full object-cover bg-mono-900"
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

// sizes="100vw sm:50vw md:400px"
// densities="x1 x2"
</script>

<template>
	<nuxt-img
		:src="props.src"
		:alt="props.alt"
		class="h-full w-full bg-mono-900 object-cover"
		sizes="100vw lg:720px"
		densities="x1 x2"
		quality="80"
		:placeholder="img(props.src, { h: 40, q: 100 })"
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
const img = useImage()
// note: using q 100 for placeholder to make it look better since rendering happens at the build step
</script>

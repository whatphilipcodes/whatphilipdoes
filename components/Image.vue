<template>
	<nuxt-img
		:src="props.src"
		:alt="props.alt"
		class="h-full w-full bg-mono-900 object-cover"
		:placeholder="img(props.src, { h: 40, q: 100, blur: 3 })"
		format="webp"
		sizes="480px md:720px lg:1024px"
		:preload="true"
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
// note: using q100 for placeholder to make it look better since rendering happens at the build step
</script>

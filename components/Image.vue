<template>
	<component
		v-if="isSvg"
		class="h-full w-full object-cover"
		:fontControlled="false"
		filled
		:is="svgComponent"
	/>
	<nuxt-img
		v-else
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
const isSvg = computed(() => props.src.endsWith('.svg'))
const svgComponent = props.src.replace('.svg', '')
// note: using q100 for placeholder to make it look better since rendering happens at the build step
</script>

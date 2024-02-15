<template>
	<video
		v-if="props.src"
		autoplay
		muted
		loop
		playsinline
		preload="auto"
		class="block h-full w-full object-cover"
	>
		<source :src="props.src" type="video/mp4" />
		<Image :src="props.poster" />
	</video>
	<Image v-else :src="props.poster" />
</template>

<script setup lang="ts">
// :poster="img(props.poster, { w: 1920, h: 1920, q: 90 })"
const props = defineProps({
	src: {
		type: String,
		required: true,
	},
	poster: {
		type: String,
		required: false,
		default: '',
	},
})
const img = useImage()
</script>

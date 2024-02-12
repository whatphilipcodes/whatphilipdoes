<template>
	<video
		autoplay
		muted
		loop
		playsinline
		preload="auto"
		:poster="poster"
		class="block h-full w-full object-cover"
	>
		<source
			:src="props.src"
			type="video/mp4"
			style="transform: translateZ(-1)"
		/>
	</video>
</template>

<script setup lang="ts">
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
const poster = img(props.poster, {
	sizes: '100vw lg:1440px',
	densities: 'x1 x2',
	quality: 80,
})
</script>

<style scoped></style>

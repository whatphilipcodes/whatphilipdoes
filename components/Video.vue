<template>
	<video
		autoplay
		muted
		loop
		playsinline
		preload="auto"
		:poster="img(props.poster, { w: 1920, h: 1920, q: 90 })"
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
</script>

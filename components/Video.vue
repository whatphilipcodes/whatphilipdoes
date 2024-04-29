<template>
	<video
		ref="video"
		v-if="props.src && !showPoster"
		muted
		loop
		playsinline
		preload="auto"
		class="block h-full w-full bg-black object-cover"
	>
		<source
			:src="props.src"
			type="video/mp4"
			class="hidden"
			:onerror="
				() => {
					showPoster = true
				}
			"
		/>
	</video>
	<Image v-else :src="props.poster" />
</template>

<script setup lang="ts">
const video = ref<HTMLVideoElement>()
const showPoster = ref(false)
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

// allows nuxt image to find poster for prerendering
if (process.env.NODE_ENV === 'prerender') {
	showPoster.value = true
}

onMounted(() => {
	video.value?.play().catch((e) => {
		showPoster.value = true
	})
})
</script>

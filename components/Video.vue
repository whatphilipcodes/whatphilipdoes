<template>
	<video
		ref="video"
		v-if="props.src && !error"
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
					error = true
				}
			"
		/>
	</video>
	<Image v-else :src="props.poster" />
</template>

<script setup lang="ts">
const video = ref<HTMLVideoElement>()
const error = ref(false)
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

onMounted(() => {
	video.value?.play().catch((e) => {
		error.value = true
	})
})
</script>

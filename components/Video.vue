<template>
	<video
		v-if="props.src && !error"
		autoplay
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
			:onerror="fallback"
		/>
	</video>
	<Image v-else :src="props.poster" />
</template>

<script setup lang="ts">
const error = ref(false)
function fallback() {
	error.value = true
}
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
</script>

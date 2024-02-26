<!-- #todo: delete this -->
<template>
	<div
		class="absolute h-lvh w-full transition-transform ease-in-out will-change-transform"
		:class="props.translate"
		:style="{ transitionDuration: props.msDuration + 'ms' }"
	>
		<slot />
	</div>
</template>

<script setup lang="ts">
const props = defineProps({
	translate: {
		type: String,
		default: '',
	},
	msDuration: {
		type: Number,
		default: 1000,
	},
})

const isAnimating = ref(false)

// watch
watch(
	() => props.translate,
	() => {
		isAnimating.value = true
		setTimeout(() => {
			isAnimating.value = false
		}, props.msDuration)
	},
)
defineExpose({ isAnimating })
</script>

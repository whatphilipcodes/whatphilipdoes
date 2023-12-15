<template>
	<div :class="classList">
		<NuxtPicture
			format="webp"
			:src="props.bgImage"
			:imgAttrs="{ class: 'h-full w-full object-cover' }"
		/>
	</div>
</template>

<script setup lang="ts">
// exposed
const isAnimating = ref(false)
defineExpose({ isAnimating })

// props
const props = defineProps({
	translate: {
		type: String,
		default: '',
	},
	msDuration: {
		type: Number,
		default: 1000,
	},
	id: {
		type: Number,
		default: 0,
	},
	title: {
		type: String,
		default: '',
	},
	tags: {
		type: Array,
		default: () => [],
	},
	bgImage: {
		type: String,
		default: '',
	},
})
const durationClassToken = computed(() => {
	return `${props.msDuration}ms`
})
const classList = computed(() => {
	return {
		[`absolute top-full transition-transform dynamic-duration ease-in-out h-full w-full bg-cinnabar-800`]:
			true,
		[props.translate]: true,
	}
})

watch(classList, () => {
	isAnimating.value = true
	setTimeout(() => {
		isAnimating.value = false
	}, props.msDuration)
})
</script>

<style scoped>
.dynamic-duration {
	transition-duration: v-bind('durationClassToken');
}
</style>

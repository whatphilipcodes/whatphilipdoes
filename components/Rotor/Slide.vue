<template>
	<div :class="classList">
		<CardProject
			:projectData="props.projectData"
			class="col-span-full w-screen h-screen md:h-dvh"
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
	projectData: {
		type: Object as PropType<contentProject>,
		required: true,
	},
})
const durationClassToken = computed(() => {
	return `${props.msDuration}ms`
})
const classList = computed(() => {
	return {
		[`absolute top-full transition-transform dynamic-duration ease-in-out h-full w-full will-change-transform`]:
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

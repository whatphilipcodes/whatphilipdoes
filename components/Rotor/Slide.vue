<template>
	<div
		class="dynamic-duration absolute h-full w-full transition-transform ease-in-out will-change-transform"
		:class="classList"
	>
		<CardProject
			:projectData="props.projectData"
			class="col-span-full h-screen w-screen md:h-dvh"
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

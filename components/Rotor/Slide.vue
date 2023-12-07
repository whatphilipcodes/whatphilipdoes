<template>
	<div :class="classList">slide</div>
</template>

<script setup lang="ts">
const props = defineProps({
	translate: {
		type: String,
		default: '',
	},
})
const classList = computed(() => {
	return {
		'absolute top-full transition-transform duration-1000 ease-in-out h-full w-full bg-cinnabar-50':
			true,
		[props.translate]: true,
	}
})
</script>

<style scoped></style>

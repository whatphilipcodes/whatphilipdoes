<template>
	<div :class="classList">
		<slot />
	</div>
</template>
<script setup lang="ts">
// #info: mb will lead to alignment issues with the scroll segments (mt only here)
const props = defineProps({
	bottomPadding: {
		type: Boolean,
		default: true,
	},
})

const classList = computed(() => {
	return {
		'grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 px-4 md:px-8 lg:px-32 py-4 md:py-6 lg:py-8':
			props.bottomPadding,
		'grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 px-4 md:px-8 lg:px-32 pt-4 md:pt-6 lg:pt-8':
			!props.bottomPadding,
	}
})
</script>

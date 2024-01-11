<template>
	<CardProject
		:opened="true"
		:projectTags="props.projectTags"
		:title="props.title"
		:abstract="props.abstract"
		:bgImage="props.bgImage"
		class="col-span-full w-screen"
	/>
</template>

<script setup lang="ts">
const props = defineProps({
	title: {
		type: String,
		default: '',
	},
	bgImage: {
		type: Object as PropType<imageData>,
		required: true,
	},
	projectTags: {
		type: Array,
		default: ['did', 'not', 'receive', 'projectTags'],
	},
	abstract: {
		type: String,
		default: '',
	},
})
</script>

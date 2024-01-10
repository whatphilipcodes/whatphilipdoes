<template>
	<CardProject
		:opened="true"
		:projectTags="props.projectTags"
		:title="props.title"
		:abstract="props.abstract"
		:bgImage="props.bgImage"
		class="col-span-full w-screen"
	/>
	<div class="col-span-full h-44 bg-cinnabar-700"></div>
</template>

<script setup lang="ts">
const props = defineProps({
	title: {
		type: String,
		default: '',
	},
	bgImage: {
		type: String,
		default: '',
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

<template>
	<div class="relative col-span-full w-screen h-[80vh] justify-self-center">
		<CardProject
			:projectTags="props.projectTags"
			:title="props.title"
			:abstract="props.abstract"
			:bgImage="props.bgImage"
		/>
	</div>
	<div class="pt-20 col-span-full"></div>
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

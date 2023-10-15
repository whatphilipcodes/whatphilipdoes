<template>
	<div>
		<h1>Awesome Project: {{ projectID }}</h1>
		<p>
			At some point in the future here will be a really cool project detail
			view. One might even call it a case study.
		</p>
	</div>
</template>

<script setup lang="ts">
const { projectID } = useRoute().params
definePageMeta({
	layout: 'projects',
})
</script>

<style scoped></style>

<template>
	<ContentDoc v-slot="{ doc }">
		<ContentRenderer :value="doc" tag="layout-columns" class="gap-y-8" />
	</ContentDoc>
	<div class="h-8"></div>
	<Footer />
</template>

<script setup lang="ts">
definePageMeta({
	layout: 'minimal',
})
</script>

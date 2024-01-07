<template>
	<ContentDoc v-slot="{ doc }">
		<ContentRenderer :value="doc" tag="layout-columns" />
	</ContentDoc>
</template>

<script setup lang="ts">
definePageMeta({
	layout: 'project',
})
</script>

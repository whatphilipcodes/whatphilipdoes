<template>
	<ContentDoc v-slot="{ doc }">
		<ContentRenderer :value="doc" tag="layout-columns" class="gap-y-8" />
	</ContentDoc>
</template>

<script setup lang="ts">
definePageMeta({
	layout: 'minimal',
})
</script>

<template>
	<LayoutColumns>
		<ContentDoc v-slot="{ doc }">
			<ContentRenderer :value="doc" tag="div" class="col-span-full lg:mt-32" />
		</ContentDoc>
	</LayoutColumns>
	<div class="h-8"></div>
	<Footer />
</template>

<script setup lang="ts">
definePageMeta({
	layout: 'minimal',
})
</script>

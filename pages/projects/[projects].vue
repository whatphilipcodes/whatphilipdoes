<template>
	<ContentDoc v-slot="{ doc }">
		<ContentRenderer
			:value="doc"
			tag="layout-columns"
			class="gap-y-12 pb-4 md:pb-8"
		/>
		<Footer :segment="doc.footer" />
	</ContentDoc>
</template>

<script setup lang="ts">
definePageMeta({
	layout: 'minimal',
})
useScrollSegments()
</script>

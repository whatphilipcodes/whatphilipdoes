<template>
	<ContentRenderer
		:value="content"
		tag="layout-columns"
		class="gap-y-12 pb-4 md:pb-8"
	/>
	<Footer :segment="content.footer" />
</template>

<script setup lang="ts">
definePageMeta({
	layout: 'minimal',
})
const { data } = await useAsyncData(() =>
	queryContent<contentProject>(useRoute().fullPath).findOne(),
)
const content = computed(() => data?.value as contentProject)
useContentHead(content)
useScrollSegments()
</script>

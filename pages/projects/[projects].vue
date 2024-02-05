<template>
	<ContentRenderer
		:value="(data as ParsedContent)"
		tag="layout-columns"
		class="gap-y-12 pb-4 md:pb-8"
	/>
	<Footer :segment="data?.footer" />
</template>

<script setup lang="ts">
import type { ParsedContent } from '@nuxt/content/dist/runtime/types'
definePageMeta({
	layout: 'minimal',
})
const { data } = await useAsyncData(() =>
	queryContent<contentProject>(useRoute().fullPath).findOne()
)
useScrollSegments()
</script>

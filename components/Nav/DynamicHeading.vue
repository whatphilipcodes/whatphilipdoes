<template>
	<div
		data-info="dynamic-heading"
		class="absolute bottom-0 lg:top-0 left-0 flex flex-col font-semibold text-xl leading-xl"
	>
		<div
			data-info="container-logo-top"
			class="flex flex-row gap-4 text-mono-500"
		>
			<div data-info="page" class="inline align-text-top">{{ page }}</div>
		</div>
		<div data-info="container-logo-bottom" class="flex flex-row text-mono-50">
			<div data-info="highlight">{{ highlight }}</div>
		</div>
	</div>
</template>

<script setup lang="ts">
defineProps(['highlight', 'page'])
</script>

<template>
	<div
		id="dynamic-heading"
		class="absolute bottom-0 lg:top-0 left-0 flex flex-col font-semibold text-xl leading-xl pointer-events-auto"
	>
		<div id="container-logo-top" class="flex flex-row gap-4 text-mono-500">
			<div id="page" class="inline align-text-top">{{ page }}</div>
		</div>
		<div id="container-logo-bottom" class="flex flex-row text-mono-50">
			<div id="highlight">{{ highlight }}</div>
		</div>
	</div>
</template>

<script setup lang="ts">
defineProps(['highlight', 'page'])
</script>

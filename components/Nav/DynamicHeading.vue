<template>
	<div
		data-info="dynamic-heading"
		class="pointer-events-auto absolute left-0 top-0 flex flex-col text-xl font-semibold leading-xl"
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

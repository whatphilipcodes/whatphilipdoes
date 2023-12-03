<template>
	<div
		id="dynamic-heading"
		class="absolute bottom-4 lg:top-4 left-4 lg:left-32 flex flex-col w-full font-semibold text-xl leading-xl"
	>
		<div id="container-logo-top" class="flex flex-row gap-4 text-mono-500">
			<div id="prefix" class="inline align-text-top">{{ prefix }}</div>
			<div id="name">philip</div>
		</div>
		<div id="container-logo-bottom" class="flex flex-row text-mono-50">
			<div id="highlight">{{ highlight }}</div>
		</div>
	</div>
</template>

<script setup lang="ts">
defineProps(['highlight', 'prefix'])
</script>

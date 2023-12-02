<template>
	<div
		id="dynamic-heading"
		class="flex flex-col w-full font-semibold text-xl leading-xl absolute bottom-4 lg:top-4"
	>
		<div id="container-logo-static" class="flex flex-row gap-4 text-mono-500">
			<div id="what">what</div>
			<div id="philip">philip</div>
		</div>
		<div id="container-logo-dynamic" class="flex flex-row text-mono-50">
			<div id="text-dynamic">{{ activePage }}</div>
		</div>
	</div>
</template>

<script setup lang="ts">
defineProps(['activePage'])
</script>

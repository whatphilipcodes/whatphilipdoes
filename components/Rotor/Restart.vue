<template>
	<div @click="props.callback" class="relative h-lvh w-full">
		<div class="absolute top-0 h-full w-full bg-cinnabar-950" />
		<div class="absolute top-0 h-full w-full bg-gradient-to-t from-mono-900" />
		<LayoutColumns class="absolute h-full w-full">
			<div class="col-span-full">show again</div>
		</LayoutColumns>
	</div>
</template>

<script setup lang="ts">
const props = defineProps({
	callback: {
		type: Function,
		required: true,
	},
})
</script>

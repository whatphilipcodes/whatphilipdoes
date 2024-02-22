<template>
	<div @click="props.callback" class="relative h-lvh w-full cursor-pointer">
		<div class="absolute top-0 h-full w-full bg-cinnabar-950" />
		<div
			class="flash-enter absolute top-0 h-full w-full bg-gradient-to-t from-mono-900 hover:bg-mono-800/20 active:bg-cinnabar-500/20"
		/>
		<LayoutColumns class="absolute h-full w-full">
			<div class="col-span-full self-end py-12 text-cinnabar-500">
				click to show again
			</div>
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

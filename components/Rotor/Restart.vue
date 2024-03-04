<template>
	<div @click="props.callback(0)" class="relative h-full w-full cursor-pointer">
		<div class="absolute bottom-0 h-full w-full bg-cinnabar-950" />
		<div
			class="absolute bottom-0 h-2/3 w-full bg-gradient-to-t from-mono-900"
		/>
		<div
			class="flash-enter absolute bottom-0 h-full w-full hover:bg-mono-800/20 active:bg-cinnabar-500/20"
		/>
		<LayoutColumns
			class="pointer-events-none absolute bottom-0 left-0 right-0 h-full w-full"
		>
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

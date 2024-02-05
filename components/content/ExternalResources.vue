<template>
	<div class="hidden lg:grid grid-cols-subgrid col-span-full">
		<p class="col-start-1 col-span-2 text-mono-500">extern</p>
		<div class="col-span-10 flex flex-row gap-4">
			<Button
				v-for="button in props.segment?.buttons"
				class="w-44 h-10 text-base"
				:variant="button.accent ? 'accent' : 'dark'"
				>{{ button.label }}</Button
			>
		</div>
	</div>
</template>

<script setup lang="ts">
const props = defineProps({
	segment: {
		type: Object as PropType<pageSegment>,
		default: undefined,
	},
})
</script>

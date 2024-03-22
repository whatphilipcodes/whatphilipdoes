<template>
	<div class="col-span-full hidden grid-cols-subgrid lg:grid">
		<p class="col-span-2 col-start-1 text-mono-600">{{ props.label }}</p>
		<div class="col-span-10 flex flex-row gap-4">
			<Button
				v-for="button in props.segment?.buttons"
				class="h-10 w-44 text-base"
				:variant="button.variant ?? 'dark'"
				:to="button.to"
				>{{ button.label }}</Button
			>
		</div>
	</div>
</template>

<script setup lang="ts">
const props = defineProps({
	label: {
		type: String,
		default: 'external',
	},
	segment: {
		type: Object as PropType<pageSegment>,
		default: undefined,
	},
})
</script>

<template>
	<div
		class="mt-8 col-span-full md:col-start-4 md:col-end-9 lg:col-start-6 lg:col-end-13 italic text-lg"
	>
		{{ props.text }}
	</div>
</template>

<script setup lang="ts">
const props = defineProps({
	text: {
		type: String,
		required: true,
	},
})
</script>

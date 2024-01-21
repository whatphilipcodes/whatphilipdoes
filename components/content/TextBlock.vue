<template>
	<div
		class="col-span-full md:col-start-4 md:col-end-9 lg:col-start-6 lg:col-end-13"
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

<template>
	<TouchableLink :href="href" :target="target" variant="inline-accent">
		<slot />
	</TouchableLink>
</template>

<script setup lang="ts">
defineProps({
	href: {
		type: String,
		default: '',
	},
	target: {
		type: String,
		default: undefined,
		required: false,
	},
})
</script>

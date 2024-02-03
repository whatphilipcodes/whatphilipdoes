<template>
	<TouchableLink :href="href" :target="target" :variant="variant">
		{{ label ?? href }}
	</TouchableLink>
</template>

<script setup lang="ts">
defineProps({
	href: {
		type: String,
		default: '',
	},
	label: {
		type: String,
		default: undefined,
	},
	variant: {
		type: String,
		validator: (value: string) => ['dark', 'accent'].includes(value),
		default: 'dark',
	},
	target: {
		type: String,
		default: undefined,
		required: false,
	},
})
</script>

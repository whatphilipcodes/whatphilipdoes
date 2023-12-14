<template>
	<NuxtLink
		:href="href"
		:target="target"
		class="hyphens-auto text-cinnabar-500 underline"
		lang="de"
	>
		<slot />
	</NuxtLink>
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

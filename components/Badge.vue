<template>
	<NuxtLink
		:to="props.link"
		class="group flex select-none flex-row-reverse items-center gap-4 border border-mono-50 border-opacity-0 pl-4 text-mono-600 transition delay-100 duration-500 hover:border-opacity-100 hover:text-mono-50"
		:class="props.link ? 'cursor-pointer' : 'cursor-default'"
	>
		<div
			class="flex h-10 w-10 flex-shrink-0 items-center justify-center self-end text-lg"
		>
			<slot />
		</div>
		<p
			class="w-30 flex text-mono-50 opacity-0 transition delay-100 duration-150 group-hover:opacity-100"
		>
			{{ props.info }}
		</p>
	</NuxtLink>
</template>

<script setup lang="ts">
const props = defineProps({
	info: {
		type: String,
		default: 'missing info',
	},
	link: {
		type: String,
		default: null,
	},
})
</script>

<template>
	<NuxtLink
		:to="props.link"
		class="transition delay-100 duration-500 group select-none flex flex-row-reverse items-center border gap-4 pl-4 border-mono-50 text-mono-500 border-opacity-0 hover:border-opacity-100 hover:text-mono-50"
		:class="props.link ? 'cursor-pointer' : 'cursor-default'"
	>
		<div
			class="flex flex-shrink-0 self-end items-center justify-center text-lg w-10 h-10"
		>
			<slot />
		</div>
		<p
			class="transition delay-100 duration-150 flex w-30 text-mono-50 opacity-0 group-hover:opacity-100"
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

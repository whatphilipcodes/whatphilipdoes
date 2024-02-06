<template>
	<div class="relative col-span-full h-44">
		<div
			data-info="bg-container"
			class="absolute top-0 h-full w-full bg-cinnabar-900"
		>
			<Image :src="data.header.src" :alt="data.header.alt" />
			<div
				class="absolute top-0 h-full w-full bg-gradient-to-t from-mono-900"
			/>
		</div>
		<div
			data-info="description"
			class="absolute bottom-4 right-4 flex flex-col place-content-end text-end"
		>
			<div class="text-mono-500">{{ props.label }}</div>
			<div class="text-cinnabar-500">
				{{ data.title }}
			</div>
		</div>
		<NuxtLink
			class="flash-enter absolute top-0 h-full w-full border border-transparent transition-colors hover:bg-mono-800/20 active:bg-mono-50"
			:to="props.to"
		/>
	</div>
</template>

<script setup lang="ts">
const props = defineProps({
	label: {
		type: String,
		default: 'nächste arbeit',
	},
	to: {
		type: String,
		default: '/',
	},
})
const data = await queryContent<contentProject>(props.to).findOne()
</script>

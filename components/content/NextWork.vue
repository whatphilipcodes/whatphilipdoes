<template>
	<div class="group flex relative col-span-full h-44">
		<div data-info="bg-container" class="relative w-full h-full">
			<Image class="" :src="data.header.src" :alt="data.header.alt" />
			<div
				class="absolute top-0 w-full h-full bg-gradient-to-t from-mono-900 group-active:from-mono-800"
			/>
		</div>
		<div
			data-info="description"
			class="absolute bottom-4 right-4 flex flex-col place-content-end text-end"
		>
			<div class="text-mono-500">nächste arbeit</div>
			<div class="text-cinnabar-500">{{ data.title }}</div>
		</div>
		<NuxtLink class="absolute w-full h-full" :to="props.to" />
	</div>
</template>

<script setup lang="ts">
const props = defineProps({
	to: {
		type: String,
		default: '/',
	},
})
const data = await queryContent<contentProject>(props.to).findOne()
</script>

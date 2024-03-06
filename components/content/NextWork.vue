<template>
	<div class="relative col-span-full h-44 w-screen justify-self-center">
		<div
			data-info="bg-container"
			class="absolute top-0 h-full w-full bg-cinnabar-950"
		>
			<Video
				v-if="data.header"
				:src="data.header.src"
				:poster="data.header.poster"
			/>
			<div
				class="absolute top-0 h-full w-full bg-gradient-to-t from-mono-900"
			/>
		</div>
		<div data-info="description" class="absolute bottom-4 left-4 flex flex-col">
			<div class="text-mono-500">{{ props.label }}</div>
			<div class="text-cinnabar-500" v-if="data.header">
				{{ data.title }}
			</div>
		</div>
		<NuxtLink
			class="flash-enter absolute top-0 h-full w-full border border-transparent transition-colors hover:bg-mono-800/20 active:bg-cinnabar-500/20"
			:to="props.to"
		/>
	</div>
</template>

<script setup lang="ts">
const props = defineProps({
	label: {
		type: String,
		default: 'next work',
	},
	to: {
		type: String,
		default: '/',
	},
})
const data = await queryContent<contentProject>(props.to).findOne()
</script>

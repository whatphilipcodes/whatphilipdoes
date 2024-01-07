<template>
	<div class="relative col-span-full w-screen justify-self-center h-[60vh]">
		<NuxtPicture
			format="webp"
			:src="props.bgImage"
			:imgAttrs="{ class: 'w-full h-full object-cover' }"
		/>
		<div
			id="gradient"
			class="absolute top-0 w-full h-full bg-gradient-to-b lg:bg-gradient-to-t from-mono-900"
		></div>
	</div>
	<div class="pt-20 col-span-full"></div>
	<div class="flex flex-col gap-y-2 col-span-4">
		<div id="title" class="text-cinnabar-500">
			{{ title.toLowerCase() }}
		</div>
		<div class="flex flex-row flex-wrap gap-x-6 gap-y-2 h-fit">
			<div
				v-for="(tag, index) in projectTags"
				:key="index"
				class="text-mono-500"
			>
				{{ tag }}
			</div>
		</div>
		<div class="pt-20 col-span-full"></div>
	</div>

	<div class="col-start-7 col-span-6 text-lg leading-lg italic">
		{{ props.abstract }}
	</div>
</template>

<script setup lang="ts">
const props = defineProps({
	title: {
		type: String,
		default: '',
	},
	bgImage: {
		type: String,
		default: '',
	},
	projectTags: {
		type: Array,
		default: ['did', 'not', 'receive', 'projectTags'],
	},
	abstract: {
		type: String,
		default: '',
	},
})
</script>

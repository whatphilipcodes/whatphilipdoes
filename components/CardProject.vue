<template>
	<div class="h-full">
		<div class="relative h-full">
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
		<LayoutColumns
			id="metaContainer"
			class="absolute max-lg:top-0 lg:bottom-0 left-0 gap-x-6 gap-y-4 py-4 md:py-6 lg:py-8"
		>
			<div id="title" class="text-cinnabar-500 col-span-full">
				{{ title.toLowerCase() }}
			</div>
			<div class="flex flex-row flex-wrap col-span-4 gap-x-6 h-fit">
				<div
					v-for="(tag, index) in projectTags"
					:key="index"
					class="text-mono-500"
				>
					{{ tag }}
				</div>
			</div>
			<div
				class="col-span-full md:col-span-4 lg:col-span-6 md:col-start-5 lg:col-start-7"
				v-if="props.abstract"
			>
				{{ props.abstract }}
			</div>
		</LayoutColumns>
	</div>
</template>

<script setup lang="ts">
// props
const props = defineProps({
	title: {
		type: String,
		default: '',
	},
	abstract: {
		type: String,
		default: undefined,
	},
	projectTags: {
		type: Array,
		default: ['did', 'not', 'receive', 'projectTags'],
	},
	bgImage: {
		type: String,
		default: '',
	},
})
</script>

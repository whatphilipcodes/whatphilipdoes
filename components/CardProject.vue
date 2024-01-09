<template>
	<div data-info="card-project" class="flex h-full w-full">
		<div data-info="background" class="relative h-full">
			<NuxtPicture
				format="webp"
				:src="props.bgImage"
				:imgAttrs="{ class: 'w-full h-full object-cover' }"
			/>
			<div
				data-info="gradient-overlay"
				class="absolute top-0 w-full h-full bg-gradient-to-b lg:bg-gradient-to-t from-mono-900"
			></div>
		</div>
		<LayoutPadding data-info="project-meta" class="absolute top-0 h-[100%]">
			<div data-info="project-title" class="text-cinnabar-500 col-span-full">
				{{ title.toLowerCase() }}
			</div>
			<div
				data-info="project-tags"
				class="flex flex-row flex-wrap col-span-4 gap-x-6 h-fit"
			>
				<div
					v-for="(tag, index) in projectTags"
					:key="index"
					class="text-mono-500"
				>
					{{ tag }}
				</div>
			</div>
			<div
				data-info="project-abstract"
				class="col-span-full md:col-span-4 lg:col-span-6 md:col-start-5 lg:col-start-7"
				v-if="props.abstract"
			>
				{{ props.abstract }}
			</div>
		</LayoutPadding>
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

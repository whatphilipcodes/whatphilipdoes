<template>
	<CardProject
		:projectData="projectData"
		:opened="true"
		class="col-span-full h-[72lvh] w-lvw md:h-[56lvh] lg:h-[64lvh]"
	/>
	<div class="col-span-3 hidden md:block lg:col-span-4">
		<div data-info="project-title" class="col-span-full text-mono-50">
			{{ projectData.title?.toLowerCase() }}
		</div>
		<div
			data-info="project-tags"
			class="col-span-3 mt-4 flex h-fit flex-row flex-wrap gap-x-2 text-mono-600"
		>
			<template v-for="(tag, index) in projectData.projectTags" :key="index">
				<div class="flex flex-row flex-nowrap gap-x-2">
					<div>{{ tag.toLowerCase() }}</div>
					<div v-if="index < projectData.projectTags.length - 1">·</div>
				</div></template
			>
		</div>
	</div>
	<div
		class="col-span-full hyphens-auto text-pretty text-lg italic md:col-start-4 lg:col-start-6"
	>
		{{ projectData.abstract }}
	</div>
</template>

<script setup lang="ts">
const props = defineProps({
	title: {
		type: String,
		default: '',
	},
	header: {
		type: Object as PropType<imageData>,
		required: true,
	},
	projectTags: {
		type: Array,
		default: ['did', 'not', 'receive', 'projectTags'],
	},
	badge: {
		type: Object as PropType<badgeData>,
		default: null,
	},
	abstract: {
		type: String,
		default: '',
	},
})
const projectData = computed(() => {
	return {
		title: props.title,
		header: props.header,
		projectTags: props.projectTags,
		abstract: props.abstract,
		badge: props.badge,
		landing: false,
	} as contentProject
})
</script>

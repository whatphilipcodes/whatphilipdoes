<template>
	<div
		data-info="project-card"
		class="relative flex w-full justify-self-center"
		:style="{
			height: props.opened ? `${useGlobalStore().lvh * 0.6}px` : '100%',
		}"
	>
		<Video
			class="h-full w-full"
			:src="props.projectData.header.src"
			:poster="props.projectData.header.poster"
		/>
		<div class="absolute top-0 h-full w-full bg-gradient-to-t from-mono-900" />
		<LayoutPadding data-info="meta" class="absolute bottom-0 w-full">
			<div data-info="project-title" class="col-span-full text-cinnabar-500">
				{{ props.projectData.title?.toLowerCase() }}
			</div>
			<div
				data-info="project-tags"
				class="col-span-3 mt-4 flex h-fit flex-row flex-wrap gap-x-6"
			>
				<div
					v-for="(tag, index) in props.projectData.projectTags"
					:key="index"
					class="text-mono-500"
				>
					{{ tag.toLowerCase() }}
				</div>
			</div>
		</LayoutPadding>
	</div>
</template>

<script setup lang="ts">
// props
const props = defineProps({
	projectData: {
		type: Object as PropType<contentProject>,
		required: true,
	},
	opened: {
		type: Boolean,
		default: false,
	},
})
</script>

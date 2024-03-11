<template>
	<div
		data-info="project-card"
		class="relative flex w-full justify-self-center"
		:style="{
			height: props.opened ? `${store.lvh * 0.6}px` : '100%',
		}"
	>
		<Video
			class="h-full w-full"
			:src="props.projectData.header.src"
			:poster="props.projectData.header.poster"
		/>
		<div
			class="absolute bottom-0 h-2/3 w-full bg-gradient-to-t from-mono-900"
		/>
		<LayoutPadding data-info="meta" class="absolute bottom-0 left-0 right-0">
			<div data-info="project-title" class="col-span-full text-mono-50">
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
			<div v-if="!props.opened" class="col-span-full pt-4 text-cinnabar-500">
				{{ prompt }}
			</div>
		</LayoutPadding>
	</div>
</template>

<script setup lang="ts">
// props
const store = useGlobalStore()
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
const input = useDeviceType()
const prompt = computed(() => {
	switch (input.value) {
		case 'mouse':
			return 'click anywhere to open'
			break

		default:
			return 'tap anywhere to open'
			break
	}
})
</script>

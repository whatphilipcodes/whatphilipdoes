<template>
	<CardProject
		:projectData="projectData"
		:opened="true"
		class="col-span-full w-screen"
	/>
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
})
const projectData = computed(() => {
	return {
		title: props.title,
		header: props.header,
		projectTags: props.projectTags,
		abstract: flatUnwrap(useSlots().default?.(), ['p'])[0],
		badge: props.badge,
		landing: false,
	} as contentProject
})
const { flatUnwrap } = useUnwrap()
</script>

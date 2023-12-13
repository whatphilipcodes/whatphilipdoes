<template>
	<div id="container-text-block" class="flex flex-col">
		<div
			v-if="tags"
			id="tags"
			class="flex flex-col lg:flex-row lg:flex-wrap text-mono-500 gap-x-8"
		>
			<div v-for="tag in tags" :key="tag">{{ tag }}</div>
		</div>
		<div id="text" class="text-lg leading-lg italic mt-3">
			{{ description }}
		</div>
		<Button
			v-if="callToAction"
			:to="callToAction.to"
			class="mt-8 w-44 h-8 max-sm:hidden"
			>{{ callToAction.label }}</Button
		>
	</div>
</template>

<script setup lang="ts">
const props = defineProps({
	tags: {
		type: Array as PropType<string[]>,
		default: undefined,
	},
	text: {
		type: String,
		default:
			'Aute ex aute tempor enim id voluptate adipisicing pariatur. Minim magna ex proident aute veniam commodo adipisicing non reprehenderit consequat. Id anim aute ea ipsum dolore minim laboris consectetur ad irure sunt non minim.',
	},
	callToAction: {
		type: Object as PropType<{ label: string; to: string }>,
		default: undefined,
	},
	contentPlug: {
		type: Object as PropType<contentTextBlock>,
		default: undefined,
	},
})
const { tags, text: description, callToAction } = props.contentPlug ?? props
</script>

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
			{{ text }}
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
		default: 'Text block did not receive any text. Please provide a text prop.',
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
const { tags, text, callToAction } = props.contentPlug ?? props
</script>

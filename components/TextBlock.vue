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
		<div class="flex flex-row gap-4 mt-8">
			<Button
				v-if="callToAction"
				:to="callToAction.to"
				:variant="callToAction.accent ? 'accent' : 'basic'"
				:download="callToAction.download ?? undefined"
				class="w-44 h-10 max-lg:hidden"
				>{{ callToAction.label }}</Button
			>
			<slot />
		</div>
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
		type: Object as PropType<{
			label: string
			to: string
			accent: boolean
			download: string
		}>,
		default: undefined,
	},
	content: {
		type: Object as PropType<contentTextBlock>,
		default: undefined,
	},
})
const { tags, text, callToAction } = props.content ?? props
</script>

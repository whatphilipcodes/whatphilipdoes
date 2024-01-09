<template>
	<div name="container-text-block" class="flex flex-col w-full">
		<div
			v-if="tags"
			name="tags"
			class="flex flex-col lg:flex-row lg:flex-wrap text-mono-500 gap-x-8"
		>
			<div v-for="tag in tags" :key="tag">{{ tag }}</div>
		</div>
		<div
			class="flex flex-row lg:flex-col w-full justify-between lg:justify-normal mt-3"
		>
			<div name="text" class="text-lg leading-lg italic">
				{{ text }}
			</div>
			<div
				class="flex flex-col lg:flex-row self-end lg:self-start w-12 lg:w-fit lg:mt-3 gap-4"
			>
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
		type: Object as PropType<contentBlockTextCTA>,
		default: undefined,
	},
})
const { tags, text, callToAction } = props.content ?? props
</script>

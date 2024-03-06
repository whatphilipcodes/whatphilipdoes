<template>
	<div data-info="container-text-block" class="flex w-full flex-col">
		<div
			v-if="tags"
			data-info="tags"
			class="flex flex-col gap-x-8 text-mono-500 lg:flex-row lg:flex-wrap"
		>
			<div v-for="tag in tags" :key="tag">{{ tag }}</div>
		</div>
		<div
			class="mt-3 flex w-full flex-row justify-between lg:flex-col lg:justify-normal"
		>
			<div
				data-info="text"
				class="line-clamp-6 hyphens-auto text-lg italic leading-lg"
			>
				{{ text }}
			</div>
			<div
				class="flex w-14 flex-col gap-4 self-end lg:mt-3 lg:w-fit lg:flex-row lg:self-start"
			>
				<Button
					v-for="button in buttons"
					:to="button.to"
					:variant="button.variant ?? 'basic'"
					:download="button.download ?? undefined"
					class="h-10 w-44 max-lg:hidden"
					>{{ button.label }}</Button
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
	buttons: {
		type: Array as PropType<buttonData[]>,
		default: undefined,
	},
	content: {
		type: Object as PropType<contentBlockTextCTA>,
		default: undefined,
	},
})
const { tags, text, buttons } = props.content ?? props
</script>

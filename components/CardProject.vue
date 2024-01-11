<template>
	<div
		data-info="project"
		class="relative flex flex-col w-full h-fit justify-self-center"
	>
		<div
			data-info="container-bg"
			class="absolute z-[20] top-0 flex flex-col w-full h-full"
		>
			<div
				data-info="bg"
				class="relative w-full"
				:class="{ 'h-[64vh]': props.opened, 'h-[100vh]': !props.opened }"
			>
				<div data-info="image" class="w-full h-full bg-cinnabar-800">
					<Image :src="props.bgImage.src" :alt="props.bgImage.alt" />
				</div>
				<div
					data-info="gradient-overlay"
					class="absolute top-0 w-full h-full bg-gradient-to-b lg:bg-gradient-to-t from-mono-900"
				></div>
			</div>
		</div>
		<div data-info="meta" class="flex flex-col w-full h-full">
			<LayoutColumns
				data-info="text"
				class="w-full h-full"
				:class="{ 'auto-rows-min': props.opened }"
			>
				<div data-info="spacer-top" class="h-[64vh] lg:col-span-full" />
				<div
					data-info="overlay"
					class="flex flex-col relative z-[20] h-full row-start-1 lg:row-start-auto col-span-3 lg:col-span-5 py-4 md:py-6 lg:py-8 lg:self-end"
					:class="{ 'lg:justify-end': !props.opened }"
				>
					<div
						data-info="project-title"
						class="text-cinnabar-500 col-span-full"
					>
						{{ title.toLowerCase() }}
					</div>
					<div
						data-info="project-tags"
						class="flex flex-row flex-wrap col-span-4 gap-x-6 h-fit mt-4"
					>
						<div
							v-for="(tag, index) in projectTags"
							:key="index"
							class="text-mono-500"
						>
							{{ tag }}
						</div>
					</div>
				</div>
				<div
					data-info="abstract"
					class="flex col-span-full h-full lg:col-start-7 lg:col-span- pt-4 md:pt-6 lg:pt-8 text-lg italic"
				>
					{{ props.abstract }}
				</div>
			</LayoutColumns>
		</div>
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
		type: Object as PropType<imageData>,
		required: true,
	},
	opened: {
		type: Boolean,
		default: false,
	},
})
</script>

<style lang="css" scoped>
.custom-transform-meta {
	transform: translateY(calc(40vh - 100%));
}
</style>

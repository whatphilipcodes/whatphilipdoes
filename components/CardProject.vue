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
				:class="{ 'h-[60vh]': props.opened, 'h-[100vh]': !props.opened }"
			>
				<div data-info="image" class="w-full h-full bg-cinnabar-800">
					<Image :src="props.bgImage" :alt="props.title" />
				</div>
				<div
					data-info="gradient-overlay"
					class="absolute top-0 w-full h-full bg-gradient-to-b lg:bg-gradient-to-t from-mono-900"
				></div>
			</div>
		</div>
		<div data-info="meta" class="flex flex-col w-full h-fit">
			<LayoutColumns data-info="text" class="w-full h-fit auto-rows-min">
				<div class="h-[60vh] lg:col-span-full" />
				<div
					data-info="overlay"
					class="relative z-[20] row-start-1 lg:row-start-auto col-span-3 lg:col-span-5 mt-4 md:mt-6 lg:mt-8"
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
					class="col-span-full lg:col-start-7 lg:col-span- my-4 md:my-6 lg:my-8 text-lg italic"
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
		type: String,
		default: '',
	},
	opened: {
		type: Boolean,
		default: false,
	},
})
</script>

<template>
	<div
		data-info="project"
		class="relative flex flex-col w-full h-full bg-[#376a82]"
	>
		<div
			data-info="container-bg"
			class="absolute z-[20] top-0 flex flex-col w-full h-full"
		>
			<div data-info="bg" class="relative w-full h-[60vh] bg-[#834bf3]">
				<div data-info="image" class="w-full h-full bg-cinnabar-800">
					<Image :src="props.bgImage" :alt="props.title" />
				</div>
				<div
					data-info="gradient-overlay"
					class="absolute top-0 w-full h-full bg-gradient-to-b lg:bg-gradient-to-t from-mono-900"
				></div>
			</div>
		</div>
		<div data-info="meta" class="absolute top-0 flex flex-col w-full h-full">
			<LayoutColumns data-info="text" class="w-full h-full auto-rows-min">
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
					class="col-span-full lg:col-start-7 lg:col-span- mt-4 md:mt-6 lg:mt-8 text-lg italic"
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
})
</script>

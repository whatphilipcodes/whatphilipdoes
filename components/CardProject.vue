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
				<div data-info="image" class="w-full h-full">
					<Image
						:src="props.projectData.header.src"
						:alt="props.projectData.header.alt"
					/>
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
				<div
					data-info="spacer-top"
					class="flex flex-row justify-end h-[64vh] md:col-span-5 lg:col-span-full"
				>
					<div
						class="relative z-[20] flex flex-row gap-4 py-4 md:py-6 lg:py-8 self-end"
						v-if="props.opened"
					>
						<Badge
							v-if="props.projectData.badge"
							:info="props.projectData.badge.info"
							:link="props.projectData.badge.link"
							><component :is="props.projectData.badge.icon"
						/></Badge>
					</div>
				</div>
				<div
					data-info="overlay"
					class="flex flex-col relative z-[20] h-full row-start-1 lg:row-start-auto col-span-3 lg:col-span-4 pt-4 md:pt-6 lg:pt-8 lg:self-end"
					:class="{ 'lg:justify-end': !props.opened }"
				>
					<div
						data-info="project-title"
						class="text-cinnabar-500 col-span-full"
					>
						{{ props.projectData.title?.toLowerCase() }}
					</div>
					<div
						data-info="project-tags"
						class="flex flex-row flex-wrap col-span-4 gap-x-6 h-fit mt-4"
					>
						<div
							v-for="(tag, index) in props.projectData.projectTags"
							:key="index"
							class="text-mono-500"
						>
							{{ tag.toLowerCase() }}
						</div>
					</div>
					<div
						data-info="spacer"
						v-if="!props.opened"
						class="hidden lg:block h-12"
					/>
				</div>
				<div
					data-info="abstract"
					class="flex col-span-full h-full md:col-start-4 md:col-end-9 lg:col-start-6 lg:col-end-13 pt-4 md:pt-6 lg:pt-8 text-lg italic hyphens-auto"
				>
					{{ props.projectData.abstract }}
				</div>
			</LayoutColumns>
		</div>
	</div>
</template>

<script setup lang="ts">
// props
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
</script>

<style lang="css" scoped>
.custom-transform-meta {
	transform: translateY(calc(40vh - 100%));
}
</style>

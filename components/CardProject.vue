<template>
	<div
		data-info="project"
		class="relative flex h-fit w-full flex-col justify-self-center"
	>
		<div
			data-info="container-bg"
			class="absolute top-0 z-[20] flex h-fit w-full flex-col"
		>
			<div
				data-info="bg"
				class="relative w-full"
				:class="{ 'h-[64vh]': props.opened, 'h-[100vh]': !props.opened }"
			>
				<div data-info="image" class="h-full w-full">
					<Image
						:src="props.projectData.header.src"
						:alt="props.projectData.header.alt"
					/>
				</div>
				<div
					data-info="gradient-overlay"
					class="absolute top-0 h-full w-full bg-gradient-to-b from-mono-900 lg:bg-gradient-to-t"
				></div>
			</div>
		</div>
		<div data-info="meta" class="flex h-full w-full flex-col">
			<LayoutColumns
				data-info="text"
				class="h-full w-full"
				:class="{ 'auto-rows-min': props.opened }"
			>
				<div
					data-info="spacer-top"
					class="flex h-[64vh] flex-row justify-end md:col-span-5 lg:col-span-full"
				>
					<div
						class="relative z-[20] flex flex-row gap-4 self-end py-4 md:py-6 lg:py-8"
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
					class="relative z-[20] col-span-3 row-start-1 flex h-full flex-col pt-4 md:pt-6 lg:col-span-4 lg:row-start-auto lg:self-end lg:pt-8"
					:class="{ 'lg:justify-end': !props.opened }"
				>
					<div
						data-info="project-title"
						class="col-span-full text-cinnabar-500"
					>
						{{ props.projectData.title?.toLowerCase() }}
					</div>
					<div
						data-info="project-tags"
						class="col-span-4 mt-4 flex h-fit flex-row flex-wrap gap-x-6"
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
						class="hidden h-12 lg:block"
					/>
				</div>
				<div
					data-info="abstract"
					class="col-span-full flex h-full hyphens-auto pt-4 text-lg italic md:col-start-4 md:col-end-9 md:pt-6 lg:col-start-6 lg:col-end-13 lg:pt-8"
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

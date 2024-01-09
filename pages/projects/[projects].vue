<template>
	<!-- <ContentDoc v-slot="{ doc }">
		<ContentRenderer :value="doc" tag="layout-columns" />
	</ContentDoc> -->
	<div
		data-info="container"
		class="flex flex-col w-screen h-screen bg-[#ff0000]"
	>
		<div
			data-info="project"
			class="relative flex flex-col w-full h-full bg-[#376a82]"
		>
			<div
				data-info="container-bg"
				class="absolute z-[20] top-0 flex flex-col w-full h-full"
			>
				<div data-info="bg" class="flex w-full h-full bg-cinnabar-950">
					background
				</div>
				<div
					data-info="spacer-animation"
					class="w-full h-[40vh] flex flex-shrink-0"
				/>
			</div>
			<div data-info="meta" class="absolute top-0 flex flex-col w-full h-full">
				<div data-info="in-front" class="relative z-[20]">
					<div data-info="title" class="bg-cinnabar-800">title</div>
					<div data-info="tags" class="bg-cinnabar-600">tags</div>
				</div>
				<div data-info="behind" class="mt-auto">
					<div data-info="abstract" class="bg-cinnabar-400">abstract</div>
				</div>
				<div data-info="spacer-navbar" class="w-full h-36 flex flex-shrink-0" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
definePageMeta({
	layout: 'project',
})
</script>

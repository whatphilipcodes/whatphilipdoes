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
				<LayoutPadding data-info="text" class="w-full h-full">
					<div
						data-info="overlay"
						class="relative z-[20] col-span-full lg:col-span-6 lg:mt-auto"
					>
						<div data-info="title" class="bg-cinnabar-800">title</div>
						<div data-info="tags" class="bg-cinnabar-600">tags</div>
					</div>
					<div
						data-info="abstract"
						class="col-span-full lg:col-span-6 mt-auto bg-cinnabar-400"
					>
						Amet tellus eu sit tellus donec. Facilisi enim viverra amet
						placerat. Ipsum molestie morbi dictum pharetra. Magnis pretium at
						massa quam purus a laoreet.
					</div>
				</LayoutPadding>
				<div
					data-info="spacer-navbar"
					class="w-full h-36 lg:hidden flex flex-shrink-0"
				/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
definePageMeta({
	layout: 'project',
})
</script>

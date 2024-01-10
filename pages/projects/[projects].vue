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
					class="flex flex-shrink-0 w-full h-[40vh]"
				/>
			</div>
			<div data-info="meta" class="absolute top-0 flex flex-col w-full h-full">
				<LayoutColumns data-info="text" class="w-full h-full auto-rows-min">
					<div class="h-[60vh] lg:col-span-full" />
					<div
						data-info="overlay"
						class="relative z-[20] row-start-1 lg:row-start-auto col-span-3 lg:col-span-5 mt-4 md:mt-6 lg:mt-8"
					>
						<div data-info="title" class="bg-cinnabar-800">
							this is a length test lalala land was a film muhahaha ich bin so
							böse
						</div>
						<div data-info="tags" class="bg-cinnabar-600">tags</div>
					</div>
					<div
						data-info="abstract"
						class="col-span-full lg:col-start-7 lg:col-span- mt-4 md:mt-6 lg:mt-8 bg-cinnabar-400"
					>
						Amet tellus eu sit tellus donec. Facilisi enim viverra amet
						placerat. Ipsum molestie morbi dictum pharetra. Magnis pretium at
						massa quam purus a laoreet.
					</div>
				</LayoutColumns>
				<div
					data-info="spacer-navbar"
					class="flex flex-shrink-0 w-full h-36 lg:hidden"
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

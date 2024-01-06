<template>
	<div class="fixed top-0 left-0 w-screen h-[60vh]">
		<NuxtPicture
			format="webp"
			:src="props.bgImage"
			:imgAttrs="{ class: 'h-full w-full object-cover' }"
		/>
		<div
			id="gradient"
			class="absolute top-0 w-full h-full bg-gradient-to-b lg:bg-gradient-to-t from-mono-900"
		></div>
		<LayoutColumns class="gap-x-6 gap-y-4">
			<div id="title" class="text-cinnabar-500 col-span-full">
				{{ title.toLowerCase() }}
			</div>
			<div class="flex flex-row flex-wrap col-span-3 gap-x-6">
				<div
					v-for="(tag, index) in projectTags"
					:key="index"
					class="text-mono-500"
				>
					{{ tag }}
				</div>
			</div>
		</LayoutColumns>
	</div>
</template>

<script setup lang="ts">
const props = defineProps({
	title: {
		type: String,
		default: '',
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

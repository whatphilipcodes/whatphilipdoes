<template>
	<div class="flex flex-row flex-wrap col-span-full h-full">
		<NuxtPicture
			v-for="bgImage in props.imageArray"
			format="webp"
			:src="bgImage"
			:imgAttrs="{ class: 'w-full h-full object-cover' }"
		/>
		<div>{{ props.description }}</div>
	</div>
</template>

<script setup lang="ts">
const props = defineProps({
	imageArray: {
		type: Array as PropType<string[]>,
		default: [],
		required: true,
	},
	description: {
		type: String,
		default: undefined,
		required: false,
	},
})
</script>

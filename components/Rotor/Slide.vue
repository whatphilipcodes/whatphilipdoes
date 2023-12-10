<template>
	<div :class="classList">
		<NuxtPicture
			format="webp"
			:src="props.bgImage"
			:imgAttrs="{ class: 'h-full w-full object-cover' }"
		/>
	</div>
</template>

<script setup lang="ts">
const props = defineProps({
	translate: {
		type: String,
		default: '',
	},
	id: {
		type: Number,
		default: 0,
	},
	title: {
		type: String,
		default: '',
	},
	tags: {
		type: Array,
		default: () => [],
	},
	bgImage: {
		type: String,
		default: '',
	},
})
const classList = computed(() => {
	return {
		'absolute top-full transition-transform duration-1000 ease-in-out h-full w-full bg-cinnabar-100':
			true,
		[props.translate]: true,
	}
})
</script>

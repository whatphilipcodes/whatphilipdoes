<template>
	<div :class="classList">
		<NuxtPicture
			format="webp"
			:src="props.bgImage"
			:imgAttrs="{ class: 'h-full w-full object-cover' }"
		/>
		<div
			id="gradient"
			class="absolute top-0 w-full h-full bg-gradient-to-b lg:bg-gradient-to-t from-mono-900"
		></div>
		<div
			id="metaContainer"
			class="absolute top-0 left-0 my-5 mx-4 flex flex-col gap-y-4"
		>
			<div id="title" class="text-cinnabar-500">{{ title.toLowerCase() }}</div>
			<div class="flex flex-row flex-wrap gap-x-6 gap-y-4">
				<div
					v-for="(tag, index) in tags"
					:key="index"
					class="text-mono-500 text-sm"
				>
					{{ tag }}
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
// exposed
const isAnimating = ref(false)
defineExpose({ isAnimating })

// props
const props = defineProps({
	translate: {
		type: String,
		default: '',
	},
	msDuration: {
		type: Number,
		default: 1000,
	},
	title: {
		type: String,
		default: '',
	},
	tags: {
		type: Array,
		default: ['did', 'not', 'receive', 'tags'],
	},
	bgImage: {
		type: String,
		default: '',
	},
})
const durationClassToken = computed(() => {
	return `${props.msDuration}ms`
})
const classList = computed(() => {
	return {
		[`absolute top-full transition-transform dynamic-duration ease-in-out h-full w-full bg-cinnabar-800`]:
			true,
		[props.translate]: true,
	}
})

watch(classList, () => {
	isAnimating.value = true
	setTimeout(() => {
		isAnimating.value = false
	}, props.msDuration)
})
</script>

<style scoped>
.dynamic-duration {
	transition-duration: v-bind('durationClassToken');
}
</style>

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
		<LayoutColumns
			id="metaContainer"
			class="absolute max-lg:top-0 lg:bottom-0 left-0 gap-x-6 gap-y-4 py-4 md:py-6 lg:py-8"
		>
			<div id="title" class="text-cinnabar-500 col-span-full">
				{{ title.toLowerCase() }}
			</div>
			<div class="flex flex-row flex-wrap col-span-4 gap-x-6 h-fit">
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
	projectTags: {
		type: Array,
		default: ['did', 'not', 'receive', 'projectTags'],
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
		[`absolute top-full transition-transform dynamic-duration ease-in-out h-full w-full will-change-transform`]:
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

<template>
	<div
		ref="svgContainer"
		v-if="isSvg"
		class="h-full w-full opacity-0 transition-opacity duration-1000 ease-in-out"
	>
		<component
			class="h-full w-full object-cover"
			:fontControlled="false"
			filled
			:is="svgComponent"
			:alt="props.alt"
		/>
	</div>
	<div v-else class="h-full w-full">
		<nuxt-img
			ref="image"
			:src="props.src"
			:alt="props.alt"
			class="h-full w-full bg-mono-900 object-cover"
			:placeholder="img(props.src, { h: 20, q: 100 })"
			preload
			format="webp"
			sizes="480px md:720px lg:1024px"
			@load="unblur"
		/>
		<div
			ref="blurOverlay"
			class="h-full w-full -translate-y-full backdrop-blur-xl transition-opacity duration-1000 ease-in-out"
		></div>
	</div>
</template>

<script setup lang="ts">
const props = defineProps({
	src: {
		type: String,
		required: true,
	},
	alt: {
		type: String,
		required: false,
	},
})

const img = useImage()
const isSvg = computed(() => props.src.endsWith('.svg'))
const svgComponent = props.src.replace('.svg', '')
// note: using q100 for placeholder to make it look better since rendering happens at the build step

const blurOverlay = ref<HTMLElement>()
function unblur() {
	blurOverlay.value?.classList.add('opacity-0')
}

const svgContainer = ref<HTMLElement>()
watchOnce(svgContainer, () => {
	svgContainer.value?.classList.add('opacity-100')
})
</script>

<template>
	<div class="relative h-full w-full">
		<slot />
		<NuxtLink
			v-if="props.linkActive"
			@wheel.prevent
			@touchmove.prevent
			@click="onClick"
			:to="props.to"
			class="persistent-default absolute bottom-0 z-[1] h-full w-full"
		/>
		<div
			ref="activeDisplay"
			class="pointer-events-none absolute top-0 z-[1] h-full w-full"
		/>
	</div>
</template>

<script setup lang="ts">
const props = defineProps({
	to: {
		type: String,
		default: '',
	},
	linkActive: {
		type: Boolean,
		default: false,
	},
})

const activeDisplay = ref<HTMLElement>()

//
function onClick() {
	activeDisplay.value?.classList.add(tw`bg-cinnabar-500/20`)
	setTimeout(() => {
		activeDisplay.value?.classList.add(tw`duration-300`)
		activeDisplay.value?.classList.remove(
			tw`bg-cinnabar-500/20`,
			tw`duration-300`,
		)
	}, 300)
}
</script>

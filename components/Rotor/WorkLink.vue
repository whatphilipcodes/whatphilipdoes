<template>
	<div class="relative h-full w-full">
		<slot />
		<NuxtLink
			v-if="props.linkActive"
			@wheel.prevent
			@touchmove.prevent
			@click="onClick"
			:to="props.to"
			class="persistent-default absolute top-0 z-front h-full w-full"
		/>
		<div
			ref="activeDisplay"
			class="flash-enter pointer-events-none absolute top-0 z-front h-full w-full"
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
		activeDisplay.value?.classList.remove(tw`bg-cinnabar-500/20`)
	}, 300)
}
</script>

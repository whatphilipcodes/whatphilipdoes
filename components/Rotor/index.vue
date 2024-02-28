<template>
	<div
		data-info="rotor-wrapper"
		ref="rotorScrollTop"
		class="relative col-span-full min-h-lvh w-screen justify-self-center overflow-visible"
		:style="{ height: useDisplayResolution().height + 'px' }"
	>
		<RotorSwiper
			ref="swiperInstance"
			:cb-exit="exit"
			:scroll-to-top="scrollToTop"
			:slides="props.slides"
		/>
	</div>
</template>

<script setup lang="ts">
const props = defineProps({
	slides: {
		type: Array as PropType<contentProject[]>,
		required: true,
	},
	exitCallback: {
		type: Function,
		required: false,
	},
})
const blocker = new BlockExceptionHandler('rotor-component')
const swiperInstance = ref()
const rotorScrollTop = ref<HTMLElement>()

//
function enter() {
	blocker.attachEvent('wheel', window)
	blocker.attachEvent('touchstart', window)

	swiperInstance.value?.enter()
}
defineExpose({ enter })

function exit() {
	blocker.detachEvent('wheel', window)
	blocker.detachEvent('touchstart', window)

	props.exitCallback?.()
}

//
function scrollToTop() {
	console.log('scrollToTop')
	window.scrollTo({
		top: rotorScrollTop.value?.offsetTop,
		behavior: 'smooth',
	})
}
</script>

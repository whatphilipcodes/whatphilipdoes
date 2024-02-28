<template>
	<!-- h-lvh needs to be replaced with static value here (chrome & firefox issue) -->
	<div
		data-info="rotor-wrapper"
		ref="rotorScrollPos"
		class="relative col-span-full h-[560px] w-screen justify-self-center overflow-visible"
		:style="{ height: `${staticHeight}px` }"
	>
		<RotorSwiper
			ref="swiperInstance"
			:cb-exit="exit"
			:align-swiper="alignSwiper"
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
const rotorScrollPos = ref<HTMLElement>()

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
const staticHeight = ref(0)
onBeforeMount(() => {
	staticHeight.value = window.screen.height
})

//
function alignSwiper() {
	if (!rotorScrollPos.value) return
	const bottom =
		rotorScrollPos.value.offsetTop + rotorScrollPos.value.offsetHeight
	window.scrollTo({
		top: bottom - window.innerHeight,
		behavior: 'smooth',
	})
}
</script>

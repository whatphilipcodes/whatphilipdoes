<template>
	<div
		data-info="rotor-wrapper"
		ref="rotorWrap"
		class="relative col-span-full h-[560px] w-screen justify-self-center overflow-visible"
		:style="{ height: `${useGlobalStore().lvh}px` }"
	>
		<RotorSwiper
			ref="swiperInstance"
			:cb-enter="enter"
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
const rotorWrap = ref<HTMLElement>()

//
function enter() {
	blocker.attachEvent('wheel', window)
	blocker.attachEvent('touchstart', window)
	rotorWrap.value?.classList.add('block-touch-actions')

	window.addEventListener('touchend', alignSwiper, { passive: false })
	window.addEventListener('wheel', alignSwiper, { passive: false })
	alignSwiper()

	swiperInstance.value?.enter()
}
defineExpose({ enter })

function exit() {
	blocker.detachEvent('wheel', window)
	blocker.detachEvent('touchstart', window)
	rotorWrap.value?.classList.remove('block-touch-actions')

	window.removeEventListener('touchend', alignSwiper)
	window.removeEventListener('wheel', alignSwiper)

	props.exitCallback?.()
}

//
function alignSwiper() {
	if (!rotorWrap.value) return
	const bottom = rotorWrap.value.offsetTop + rotorWrap.value.offsetHeight
	window.scrollTo({
		top: bottom - window.innerHeight,
		behavior: 'smooth',
	})
}
</script>

<style lang="css" scoped>
.block-touch-actions {
	touch-action: none;
}
</style>

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
			:fixed="isFixed"
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
const swiperInstance = ref()
const rotorWrap = ref<HTMLElement>()
const blocker = new BlockExceptionHandler('rotor-component')
const isFixed = ref(false)
let pendingAlign: NodeJS.Timeout

//
function enter(alignDelay = 800) {
	blocker.attachEvent('wheel', window)
	blocker.attachEvent('touchstart', window)
	rotorWrap.value?.classList.add('block-touch-actions')

	if (pendingAlign) clearTimeout(pendingAlign)
	pendingAlign = setTimeout(() => {
		alignSwiper()
		window.addEventListener('touchend', alignSwiper, { passive: false })
		window.addEventListener('wheel', alignSwiper, { passive: false })
	}, alignDelay) // delay to prevent scroll jump on scroll stop

	swiperInstance.value?.enter()

	console.log('rotor enter')
}
defineExpose({ enter })

function exit() {
	isFixed.value = false
	blocker.detachEvent('wheel', window)
	blocker.detachEvent('touchstart', window)
	rotorWrap.value?.classList.remove('block-touch-actions')

	window.removeEventListener('touchend', alignSwiper)
	window.removeEventListener('wheel', alignSwiper)

	props.exitCallback?.()

	console.log('rotor exit')
}

//
const { scrollToCb } = useScrollCallback()
function alignSwiper() {
	if (!rotorWrap.value) return
	const bottom = rotorWrap.value.offsetTop + rotorWrap.value.offsetHeight
	scrollToCb(window, bottom - window.innerHeight, () => {
		isFixed.value = true
	})
}

//
const store = useGlobalStore()
store.addSegmentCallback('getRotorButtons', () => {
	console.log('call to getRotorButtons')
	if (store.activeSegment.buttons?.length == 0) return
	store.updateActiveSegment({
		buttons: [],
	})
})
</script>

<style lang="css" scoped>
.block-touch-actions {
	touch-action: none;
}
</style>

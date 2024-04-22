<template>
	<div
		data-info="rotor-wrapper"
		ref="rotorWrap"
		class="relative col-span-full w-lvw justify-self-center overflow-visible"
		:style="{ height: `${store.lvh}px` }"
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
const store = useGlobalStore()
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

const isFixed = ref(false)
const swiperInstance = ref()
const rotorWrap = ref<HTMLElement>()
const blocker = new BlockExceptionHandler('rotor-component')

let pendingAlign: NodeJS.Timeout | null = null

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
		pendingAlign = null
	}, alignDelay) // delay to prevent scroll jump on scroll stop

	swiperInstance.value?.enter()
}
defineExpose({ enter })

function exit() {
	blocker.detachEvent('wheel', window)
	blocker.detachEvent('touchstart', window)
	rotorWrap.value?.classList.remove('block-touch-actions')

	window.removeEventListener('touchend', alignSwiper)
	window.removeEventListener('wheel', alignSwiper)

	isFixed.value = false
	props.exitCallback?.()
}

//
const { scrollToCb } = useScrollCallback()
const rotorBottom = computed(() => {
	if (!rotorWrap.value) return 0
	return rotorWrap.value?.offsetTop + rotorWrap.value?.offsetHeight
})
function alignSwiper() {
	scrollToCb(window, rotorBottom.value - window.innerHeight, () => {
		isFixed.value = true
	})
}

//
store.addSegmentCallback('getRotorButtons', () => {
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

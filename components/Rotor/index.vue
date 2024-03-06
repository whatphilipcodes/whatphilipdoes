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

//
function enter(alignDelay = 800) {
	blocker.attachEvent('wheel', window)
	blocker.attachEvent('touchstart', window)
	rotorWrap.value?.classList.add('block-touch-actions')

	window.addEventListener('touchend', alignSwiper, { passive: false })
	window.addEventListener('wheel', alignSwiper, { passive: false })
	setTimeout(alignSwiper, alignDelay) // delay to prevent scroll jump on scroll stop

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
const { addSegmentCallback, updateActiveSegment } = useGlobalStore()
const rotorButtons = computed(() => {
	if (isFixed.value)
		return {
			buttons: [
				{
					label: 'tap anywhere to open',
					to: '',
					variant: 'prompt',
				},
			],
		}
	else
		return {
			buttons: [],
		}
})
watch(rotorButtons, () => {
	updateActiveSegment(rotorButtons.value)
})
addSegmentCallback('getRotorButtons', () => {
	updateActiveSegment(rotorButtons.value)
})
</script>

<style lang="css" scoped>
.block-touch-actions {
	touch-action: none;
}
</style>

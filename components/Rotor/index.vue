<template>
	<div
		ref="swipeTarget"
		data-info="project-rotor"
		class="relative col-span-full h-lvh w-screen justify-self-center overflow-clip"
	>
		<RotorSlide
			v-for="(slide, index) in props.slides"
			:translate="slideTranslate(index)"
		>
			<RotorWorkLink :link-active="linksActive" :to="slide._path">
				<CardProject :projectData="slide" />
			</RotorWorkLink>
		</RotorSlide>
		<RotorSlide :translate="slideTranslate(props.slides.length)">
			<RotorRestart :callback="enter" />
		</RotorSlide>
	</div>
</template>

<script setup lang="ts">
import type { WatchStopHandle } from 'vue'

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

const linksActive = ref(false)
const activeSlide = ref(0)
const swipeTarget = ref()
const blocker = new BlockExceptionHandler('rotor-component')

const { direction: touchDirection, isSwiping: isTouching } =
	useSwipe(swipeTarget)
const { enter: enterWheelSwipe, exit: exitWheelSwipe } = useWheelSwipe(
	window,
	slideDown,
	slideUp,
)

let exitTouchSwipe: WatchStopHandle

//
function enter() {
	blocker.attachEvent('wheel', window)
	blocker.attachEvent('touchstart', window)
	window.addEventListener('touchend', scrollToTop, { passive: false })

	scrollToTop()
	enterWheelSwipe()
	exitTouchSwipe = enterTouchSwipe()
	activeSlide.value = 0
	linksActive.value = true

	console.log('enter')
}
defineExpose({ enter })
function exit() {
	blocker.detachEvent('wheel', window)
	blocker.detachEvent('touchstart', window)
	window.removeEventListener('touchend', scrollToTop)

	exitWheelSwipe()
	exitTouchSwipe()
	linksActive.value = false

	props.exitCallback?.()

	console.log('exit')
}

function slideUp() {
	if (activeSlide.value === props.slides.length) return
	activeSlide.value++
	console.log('slide down')
}
function slideDown() {
	if (activeSlide.value === 0) return
	activeSlide.value--
	console.log('slide up')
}

//
onUnmounted(() => {
	exit()
	console.log('unmounted')
})

//
watch(activeSlide, (val) => {
	if (val === props.slides.length) exit()
})

//
function enterTouchSwipe(): WatchStopHandle {
	return watch(isTouching, (val) => {
		if (val) {
			switch (touchDirection.value) {
				case 'up':
					slideUp()
					break
				case 'down':
					slideDown()
					break
				default:
					break
			}
		}
	})
}
function slideTranslate(index: number): string {
	if (index === activeSlide.value) {
		return ``
	} else if (index < activeSlide.value) {
		return tw`-translate-y-full`
	} else {
		return tw`translate-y-full`
	}
}
function scrollToTop() {
	window.scrollTo({
		top: swipeTarget.value.offsetTop,
		behavior: 'smooth',
	})
}
</script>

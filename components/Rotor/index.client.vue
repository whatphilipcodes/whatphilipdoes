<template>
	<div
		data-info="rotor-wrapper"
		ref="swiperTop"
		class="relative col-span-full min-h-dvh w-screen justify-self-center overflow-visible"
		:style="{ height: useDisplayResolution().height + 'px' }"
	>
		<div class="swiper absolute top-0 h-lvh overflow-clip">
			<div class="swiper-wrapper">
				<div v-for="slide in props.slides" class="swiper-slide">
					<RotorWorkLink :link-active="linksActive" :to="slide._path">
						<CardProject :projectData="slide" />
					</RotorWorkLink>
				</div>
				<div class="swiper-slide">
					<RotorRestart :callback="enter" />
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import Swiper from 'swiper'
import { Mousewheel, Keyboard } from 'swiper/modules'

watchDeep(
	useDisplayResolution().height,
	() => {
		console.log('height changed')
	},
	{ immediate: true },
)

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

let swiper: Swiper
const linksActive = ref(false)
const swiperTop = ref<HTMLElement>()
const blocker = new BlockExceptionHandler('rotor-component')

//
onMounted(async () => {
	await nextTick()
	swiper = new Swiper('.swiper', {
		enabled: false,
		modules: [Mousewheel, Keyboard],
		direction: 'vertical',
		speed: 600,
		mousewheel: {
			forceToAxis: true,
			thresholdDelta: 10,
			thresholdTime: 600,
		},
		keyboard: true,
		autoHeight: true,
	})
	// swiper.on('reachBeginning', scrollToTop)
	swiper.on('reachEnd', exit)
})
onUnmounted(() => {
	exit()
	swiper.destroy()
})

//
function enter() {
	blocker.attachEvent('wheel', window)
	blocker.attachEvent('touchstart', window)
	window.addEventListener('touchend', scrollToTop, { passive: false })
	window.addEventListener('wheel', scrollToTop, { passive: false })
	setTimeout(scrollToTop, 800)

	swiper.enable()
	swiper.slideTo(0, 600)
	linksActive.value = true

	console.log('enter')
}
function exit() {
	blocker.detachEvent('wheel', window)
	blocker.detachEvent('touchstart', window)
	window.removeEventListener('touchend', scrollToTop)
	window.removeEventListener('wheel', scrollToTop)

	swiper.disable()
	linksActive.value = false

	props.exitCallback?.()

	console.log('exit')
}
defineExpose({ enter })

//
function scrollToTop() {
	window.scrollTo({
		top: swiperTop.value?.offsetTop,
		behavior: 'smooth',
	})
}
</script>

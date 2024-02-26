<template>
	<div class="swiper absolute top-0 h-dvh overflow-clip">
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
</template>

<script setup lang="ts">
import Swiper from 'swiper'
import { Mousewheel, Keyboard } from 'swiper/modules'
import type { PropType } from 'vue'

const props = defineProps({
	slides: {
		type: Array as PropType<contentProject[]>,
		required: true,
	},
	cbExit: {
		type: Function,
		required: true,
	},
	scrollToTop: {
		type: Function as PropType<() => void>,
		required: true,
	},
})

let swiper: Swiper
const linksActive = ref(false)

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
	swiper.on('reachBeginning', props.scrollToTop)
	swiper.on('reachEnd', exit)
})
onUnmounted(() => {
	exit()
	swiper.destroy()
})

//
function enter() {
	window.addEventListener('touchend', props.scrollToTop, { passive: false })
	window.addEventListener('wheel', props.scrollToTop, { passive: false })
	setTimeout(props.scrollToTop, 800)

	swiper.enable()
	swiper.slideTo(0, 600)
	linksActive.value = true

	console.log('enter')
}
function exit() {
	window.removeEventListener('touchend', props.scrollToTop)
	window.removeEventListener('wheel', props.scrollToTop)

	swiper.disable()
	linksActive.value = false
	props.cbExit()

	console.log('exit')
}
defineExpose({ enter })
</script>

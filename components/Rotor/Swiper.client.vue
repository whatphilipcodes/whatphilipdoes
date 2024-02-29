<template>
	<div class="swiper absolute bottom-0 h-lvh overflow-clip">
		<div class="swiper-wrapper">
			<div v-for="slide in props.slides" class="swiper-slide">
				<RotorWorkLink :link-active="linksActive" :to="slide._path">
					<CardProject :projectData="slide" />
				</RotorWorkLink>
			</div>
			<div class="swiper-slide">
				<RotorRestart :callback="props.cbEnter" />
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
	cbEnter: {
		type: Function,
		required: true,
	},
	cbExit: {
		type: Function,
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
		resizeObserver: true,
		touchMoveStopPropagation: true,
		touchStartForcePreventDefault: true,
		modules: [Mousewheel, Keyboard],
		direction: 'vertical',
		speed: 600,
		mousewheel: {
			forceToAxis: true,
			thresholdDelta: 10,
			thresholdTime: 600,
		},
		keyboard: true,
	})
	swiper.on('reachEnd', exit)
})
onUnmounted(() => {
	exit()
	swiper.destroy()
})

//
function enter() {
	swiper.enable()
	swiper.slideTo(0, 600)
	linksActive.value = true
}
defineExpose({ enter })
function exit() {
	swiper.disable()
	linksActive.value = false
	props.cbExit()
}
</script>

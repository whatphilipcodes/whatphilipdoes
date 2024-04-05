<template>
	<div
		class="swiper bottom-0 w-full overflow-clip"
		:style="{
			height: `${store.lvh}px`,
		}"
		:class="{
			absolute: !props.fixed,
			fixed: props.fixed,
		}"
	>
		<div class="swiper-wrapper">
			<div v-for="slide in props.slides" class="swiper-slide">
				<RotorWorkLink :link-active="linksActive" :to="slide._path">
					<CardProject :projectData="slide" />
				</RotorWorkLink>
			</div>
			<div class="swiper-slide">
				<RotorRestartSlide :callback="props.cbEnter" />
			</div>
		</div>
		<RotorRestartPrompt :restartable="restartable" />
	</div>
</template>

<script setup lang="ts">
import Swiper from 'swiper'
import { Mousewheel, Keyboard } from 'swiper/modules'
import type { PropType } from 'vue'

const store = useGlobalStore()
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
	fixed: {
		type: Boolean,
		default: false,
	},
})

let swiper: Swiper
const linksActive = ref(false)
const restartable = ref(false)

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
	restartable.value = false
}
defineExpose({ enter })
function exit() {
	swiper.disable()
	linksActive.value = false
	restartable.value = true
	props.cbExit()
}
</script>

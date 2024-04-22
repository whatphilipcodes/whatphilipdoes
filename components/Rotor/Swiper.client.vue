<template>
	<ScrollPromptAuto />
	<div
		class="swiper bottom-0 w-lvw overflow-clip"
		:class="{
			absolute: !props.fixed,
			fixed: props.fixed,
			'wheel-offline': !wheelControl,
		}"
		:style="{
			height: `${store.lvh}px`,
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
	deltaThreshold: {
		type: Number,
		default: 12,
	},
})

let swiper: Swiper
const linksActive = ref(false)
const restartable = ref(false)

//
const device = useDeviceType()
const wheelControl = ref(false)

const dbEnableWheel = useDebounceFn(() => {
	{
		wheelControl.value = true
		window.removeEventListener('wheel', wheelEnableHandler)
	}
}, 100)
const wheelEnableHandler = (e: WheelEvent) => {
	dbEnableWheel()
	if (Math.abs(e.deltaY) > props.deltaThreshold) return
	wheelControl.value = true
	window.removeEventListener('wheel', wheelEnableHandler)
}
function controlledWheelEnter() {
	if (device.value === 'touch') return
	window.addEventListener('wheel', wheelEnableHandler)
}

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
			thresholdDelta: props.deltaThreshold,
			thresholdTime: 600,
			noMousewheelClass: 'wheel-offline',
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
	controlledWheelEnter()
	linksActive.value = true
	restartable.value = false
}
defineExpose({ enter })
function exit() {
	swiper.disable()
	wheelControl.value = false
	linksActive.value = false
	restartable.value = true
	props.cbExit()
}
</script>

<template>
	<div id="projectDisplay" ref="projectDisplay" :class="classList">
		<RotorSlide
			v-for="(slide, index) in slides"
			ref="slideInstances"
			:translate="computeTranslate(index)"
			:title="slide.title"
			:tags="slide.tags"
			:bg-image="slide.header"
			:ms-duration="1000"
		/>
	</div>
</template>

<script setup lang="ts">
import type { WatchStopHandle } from 'vue'

const props = defineProps({
	slides: {
		type: Array as PropType<contentProject[]>,
		required: true,
	},
	completionCallback: {
		type: Function,
		required: false,
	},
})

const classList = computed(() => {
	return {
		'w-screen h-screen col-span-full justify-self-center overflow-clip relative':
			true,
		'absolute top-0': isLocked.value,
	}
})

// is animating state
import { RotorSlide } from '#components'
const slideInstances = ref<(typeof RotorSlide)[]>([])
const isAnimating = computed(() => {
	return slideInstances.value.some((slide) => {
		return slide.isAnimating
	})
})

// exposed lock state
const isLocked = ref(true)
const toggleLock = () => {
	isLocked.value = !isLocked.value
}
watch(isLocked, (value) => {
	if (value) {
		exitWheelSwipe()
		stopLockWatch?.()
	} else {
		start()
	}
})
defineExpose({ toggleLock, isLocked })

const activeSlide = ref(0)
const projectDisplay = ref()
const completed = computed(() => activeSlide.value === props.slides.length - 1)

// exit rotor
const stopCompleteWatch = watch(completed, (value) => {
	if (value) {
		toggleLock()
		stopCompleteWatch()
		const stopAnimationWatch = watch(isAnimating, (value) => {
			if (!value) {
				props.completionCallback?.()
				stopAnimationWatch()
			}
		})
	}
})

const computeTranslate = (index: number) => {
	if (index === activeSlide.value) {
		return '-translate-y-[100%]'
	} else if (index < activeSlide.value) {
		return '-translate-y-[200%]'
	} else {
		return ''
	}
}

// swipe
const { direction, isSwiping, lengthY } = useSwipe(projectDisplay)
let stopLockWatch: WatchStopHandle = () => {}
const start = () => {
	stopLockWatch = watch(
		() => isSwiping.value,
		(value) => {
			if (!value || isAnimating.value) return
			if (direction.value === 'up') {
				if (activeSlide.value === props.slides.length - 1) return
				activeSlide.value += 1
			} else if (direction.value === 'down') {
				if (activeSlide.value === 0) return
				activeSlide.value -= 1
			}
		}
	)
	enterWheelSwipe()
}
const { enter: enterWheelSwipe, exit: exitWheelSwipe } = useWheelSwipe(
	window,
	up,
	down
)

function down() {
	if (isAnimating.value) return
	if (activeSlide.value === props.slides.length - 1) return
	activeSlide.value += 1
}

function up() {
	if (isAnimating.value) return
	if (activeSlide.value === 0) return
	activeSlide.value -= 1
}
</script>

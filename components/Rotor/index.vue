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
		<div v-if="restartUI" :class="restartClasses">
			<div class="absolute w-full h-full bg-mono-950 opacity-75"></div>
			<Button
				class="absolute w-44 h-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
				as="button"
				@click="restart"
				>restart</Button
			>
		</div>
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

// restartable state
const transitionDuration = 1000
const restartUI = ref(false)
const restartable = ref(false)
const restartClasses = computed(() => {
	return {
		[`duration-${transitionDuration}`]: true,
		'opacity-0': !restartable.value,
	}
})
async function enableRestartable() {
	console.log('enableRestartable') // #rm
	restartUI.value = true
	setTimeout(() => {
		restartable.value = true
	}, 1)
	window.removeEventListener('wheel', enableRestartable)
	window.removeEventListener('touchstart', enableRestartable)
}
function disableRestartable() {
	restartable.value = false
	setTimeout(() => {
		restartUI.value = restartable.value
	}, transitionDuration)
}
function restart() {
	if (!restartable.value) return
	disableRestartable()
}

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
		window.addEventListener('touchstart', enableRestartable)
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
const { direction, isSwiping } = useSwipe(projectDisplay)
let stopLockWatch: WatchStopHandle = () => {}
const start = () => {
	stopLockWatch = watch(
		() => isSwiping.value,
		(value) => {
			if (!value || isAnimating.value) return
			if (direction.value === 'up') {
				down()
			} else if (direction.value === 'down') {
				up()
			}
		}
	)
	enterWheelSwipe()
}
const { enter: enterWheelSwipe, exit: exitWheelSwipe } = useWheelSwipe(
	window,
	up,
	down,
	() => {
		window.addEventListener('wheel', enableRestartable)
		console.log('added event listener') // #rm
	}
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

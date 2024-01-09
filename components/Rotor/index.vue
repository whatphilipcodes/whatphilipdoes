<template>
	<div name="project-display" ref="projectDisplay" :class="classList">
		<RotorSlide
			v-for="(slide, index) in slides"
			ref="slideInstances"
			:translate="computeTranslate(index)"
			:title="slide.title"
			:project-tags="slide.projectTags"
			:bg-image="slide.header"
			:ms-duration="1000"
		/>
		<RotorOpenCase
			:active-case="slides[activeSlide]"
			:is-active="linkActive"
			:is-animating="isAnimating"
			:show-restart-u-i="restartUI"
			:cb-restart="restart"
		/>
		<div v-if="restartUI" :class="restartClasses">
			<div class="absolute w-full h-full bg-mono-950 opacity-75"></div>
			<Button
				class="absolute invisible lg:visible w-44 h-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
				as="button"
				@click="restart"
				>show again</Button
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

const isActive = ref(false)
const linkActive = ref(false)
const classList = computed(() => {
	return {
		'w-screen h-screen col-span-full justify-self-center overflow-clip relative':
			true,
		'absolute top-0': isActive.value,
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

// main controller
function enter() {
	isActive.value = true
	linkActive.value = true
	activeSlide.value = 0

	window.addEventListener('wheel', useBlockException, { passive: false })
	window.addEventListener('touchstart', useBlockException, { passive: false })
	window.addEventListener('touchend', scrollToTop, { passive: false })

	enterWheelSwipe()
	startSwipeWatch()
	startExitWatch()
}
function exit() {
	isActive.value = false
	window.removeEventListener('touchend', scrollToTop)
	setTimeout(() => {
		window.removeEventListener('wheel', useBlockException)
		window.removeEventListener('touchstart', useBlockException)
		window.addEventListener('touchstart', enableRestartable)
		exitWheelSwipe()
		stopSwipeWatch?.()
	}, 400)
}
defineExpose({ enter, exit })

// mount behavior
onUnmounted(() => {
	linkActive.value = false
	exit()
})

// restart
const restartUI = ref(false)
const restartable = ref(false)
const restartClasses = computed(() => {
	return {
		[`duration-1000`]: true,
		'opacity-0': !restartable.value,
	}
})
function enableRestartable(event: Event) {
	const target = event.target as HTMLElement
	if (target.classList.contains('persistent-default')) return
	linkActive.value = false
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
		restartUI.value = false
	}, 1000)
}
function restart() {
	if (!restartable.value) return
	disableRestartable()
	enter()
	scrollToTop()
}

// is animating state
import { RotorSlide } from '#components'
const slideInstances = ref<(typeof RotorSlide)[]>([])
const isAnimating = computed(() => {
	return slideInstances.value.some((slide) => {
		return slide.isAnimating
	})
})

const activeSlide = ref(0)
const projectDisplay = ref()
const completed = computed(() => activeSlide.value === props.slides.length - 1)

// exit rotor
const startExitWatch = () => {
	const stopExitWatch = watch(completed, (value) => {
		if (value) {
			// isLocked.value = false
			stopExitWatch()
			const stopAnimationWatch = watch(isAnimating, (value) => {
				if (!value) {
					props.completionCallback?.()
					stopAnimationWatch()
				}
			})
			exit()
		}
	})
}

// swipe
const { direction, isSwiping } = useSwipe(projectDisplay)
let stopSwipeWatch: WatchStopHandle = () => {}
const startSwipeWatch = () => {
	stopSwipeWatch = watch(
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
}
const { enter: enterWheelSwipe, exit: exitWheelSwipe } = useWheelSwipe(
	window,
	up,
	down,
	() => {
		window.addEventListener('wheel', enableRestartable)
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

// helpers
function scrollToTop() {
	window.scrollTo({
		top: projectDisplay.value.offsetTop,
		behavior: 'smooth',
	})
}
</script>

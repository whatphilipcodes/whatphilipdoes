<template>
	<div
		id="projectDisplay"
		ref="projectDisplay"
		class="w-screen h-screen col-span-full justify-self-center overflow-clip relative"
	>
		<RotorSlide
			v-for="(slide, index) in slides"
			:translate="computeTranslate(index)"
			:key="slide.id"
			:id="slide.id"
			:title="slide.title"
			:tags="slide.tags"
			:bg-image="slide.bgImage"
		/>
	</div>
</template>

<script setup lang="ts">
// props
const props = defineProps({
	isLocked: {
		type: Boolean,
		default: true,
	},
})

const activeSlide = ref(0)
const projectDisplay = ref()

const computeTranslate = (index: number) => {
	if (index === activeSlide.value) {
		return '-translate-y-[100%]'
	} else if (index < activeSlide.value) {
		return '-translate-y-[200%]'
	} else {
		return ''
	}
}

// watch(props.isLocked, (value) => {
// 	if (value) {
// 		activeSlide.value = 0
// 	}
// })

const { direction, isSwiping, lengthY } = useSwipe(projectDisplay)
const stop = watch(
	() => isSwiping.value,
	(value) => {
		console.log(direction.value, isSwiping.value, lengthY.value)
		if (!value) return
		if (direction.value === 'up') {
			activeSlide.value += 1
		} else if (direction.value === 'down') {
			activeSlide.value -= 1
		}
	}
)

// demo content
declare type Slide = {
	id: number
	title: string
	tags: string[]
	bgImage: string
}
const slides: Slide[] = [
	{
		id: 0,
		title: 'Project 1',
		tags: ['tag1', 'tag2', 'tag3'],
		bgImage: 'https://picsum.photos/seed/1/1920/1080',
	},
	{
		id: 1,
		title: 'Project 2',
		tags: ['tag1', 'tag2', 'tag3'],
		bgImage: 'https://picsum.photos/seed/2/1920/1080',
	},
	{
		id: 2,
		title: 'Project 3',
		tags: ['tag1', 'tag2', 'tag3'],
		bgImage: 'https://picsum.photos/seed/3/1920/1080',
	},
]
</script>

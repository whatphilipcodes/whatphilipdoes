<template>
	<div
		id="projectDisplay"
		ref="projectDisplay"
		class="w-screen h-screen overflow-hidden relative"
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

const activeSlide = ref(0)
const projectDisplay = ref<HTMLElement | null>(null)

const computeTranslate = (index: number) => {
	if (index === activeSlide.value) {
		return '-translate-y-[100%]'
	} else if (index < activeSlide.value) {
		return '-translate-y-[200%]'
	} else {
		return ''
	}
}
///

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
</script>

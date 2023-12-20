<template>
	<ScrollStop>
		<ScrollSegment dyn-head-highlight="does" />
		<div class="z-front max-lg:hidden w-44 h-10 justify-self-end col-start-12">
			<Button class="w-full" variant="accent">get in touch</Button>
		</div>
		<div class="col-span-full md:col-span-6 h-[50vh] lg:h-[60vh]">
			<TextBlock class="lg:mt-44" :content="landingContent" />
		</div>
		<Rotor
			ref="projectRotor"
			:completionCallback="cbRotorComplete"
			:slides="projectsContent"
		/>
		<ScrollSegment dyn-head-highlight="did" />
	</ScrollStop>
	<ScrollStop>
		<div class="mt-44 col-span-full" />
		<TextBlock
			:content="landingContent"
			class="lg:mt-44 col-span-full lg:col-span-8"
		/>
		<ScrollSegment dyn-head-highlight="will do" />
		<div class="mt-44 col-span-full" />
	</ScrollStop>
</template>

<script setup lang="ts">
// props
let cbRotorComplete: () => void

// content
const landingContent = await queryContent<contentTextBlock>(
	'landing/hero'
).findOne()
const projectsContent = await queryContent<contentProject>('projects').find()

// rotor
const projectRotor = ref()
onMounted(() => {
	// console.log('mounted index')
	const { scrollingBlocked, completeStop } = useScrollStops()
	cbRotorComplete = completeStop
	watch(scrollingBlocked, (value) => {
		if (value) {
			setTimeout(() => {
				projectRotor.value?.enter()
			}, 400)
		}
	})
})
onUnmounted(() => {
	// console.log('unmounted index')
})
</script>

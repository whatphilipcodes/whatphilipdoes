<template>
	<ScrollStop>
		<ScrollSegment :pageSegment="content[0].segment">
			<div
				class="z-front max-lg:hidden w-44 h-10 justify-self-end col-start-12"
			>
				<Button class="w-full" variant="accent">get in touch</Button>
			</div>
			<div class="col-span-full md:col-span-6 h-[50vh] lg:h-[60vh]">
				<TextBlock class="lg:mt-44" :content="content[0].contents.hero" />
			</div>
		</ScrollSegment>
		<ScrollSegment :pageSegment="content[1].segment">
			<Rotor
				ref="projectRotor"
				:completionCallback="cbRotorComplete"
				:slides="projectsContent"
			/>
		</ScrollSegment>
	</ScrollStop>
	<ScrollStop>
		<ScrollSegment :pageSegment="content[2].segment">
			<div class="mt-80 col-span-full" />
			<TextBlock
				:content="content[2].contents.closer"
				class="lg:mt-44 col-span-full lg:col-span-8"
			/>
			<div class="mt-44 col-span-full" />
		</ScrollSegment>
	</ScrollStop>
</template>

<script setup lang="ts">
// props
let cbRotorComplete: () => void

const projectRotor = ref()
const { updateActivePage } = useGlobalStore()

const content = await queryContent<contentSegment>('landing').find()
const projectsContent = await queryContent<contentProject>('projects').find()

onMounted(() => {
	// set page title
	updateActivePage({
		title: 'index',
		prefix: 'what',
	})

	// segments
	useScrollSegments()

	// enter scroll stops
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
	// exit scroll stops
})
</script>

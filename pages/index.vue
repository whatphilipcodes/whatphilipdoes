<template>
	<ScrollSegment>
		<div class="z-front max-lg:hidden w-44 h-10 justify-self-end col-start-12">
			<Button class="w-full" variant="accent">get in touch</Button>
		</div>
		<div class="col-span-full h-[60vh]">
			<TextBlock
				:content="landingContent"
				class="lg:mt-44 col-span-full lg:col-span-8"
			/>
		</div>
		<Rotor
			ref="projectRotor"
			:completionCallback="cbRotorComplete"
			:slides="projectsContent"
		/>
	</ScrollSegment>
	<ScrollSegment>
		<div class="mt-44 col-span-full" />
		<TextBlock
			:contentPlug="landingContent"
			class="lg:mt-44 col-span-full lg:col-span-8"
		/>
		<div class="mt-44 col-span-full" />
	</ScrollSegment>
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
	const { scrollingBlocked, completeStop } = useScrollSegments()
	cbRotorComplete = completeStop
	watch(scrollingBlocked, (value) => {
		if (value) {
			setTimeout(() => {
				projectRotor.value?.enter()
			}, 400)
		}
	})
})
</script>

<template>
	<ScrollSegment>
		<div class="z-front max-lg:hidden w-44 h-8 justify-self-end col-start-12">
			<Button class="w-full" variant="accent">get in touch</Button>
		</div>
		<div class="col-span-full h-[60vh]">
			<TextBlock
				:contentPlug="landingContent"
				class="lg:mt-44 col-span-full lg:col-span-8"
			/>
		</div>
		<!-- <div class="mt-32 col-span-full" /> -->
		<Rotor ref="projectRotor" :completionCallback="completeCb" />
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
let completeCb: () => void

// content
const landingContent = await queryContent<contentTextBlock>(
	'landing/hero'
).findOne()

// rotor
const projectRotor = ref()
onMounted(() => {
	const { scrollingBlocked, stopCompleted } = useScrollSegments()
	completeCb = stopCompleted
	watch(scrollingBlocked, (value) => {
		if (value) projectRotor.value.toggleLock()
	})
})
</script>

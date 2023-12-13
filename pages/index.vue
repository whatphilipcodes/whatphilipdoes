<template>
	<div class="z-front max-lg:hidden w-44 h-8 justify-self-end col-start-12">
		<Button class="w-full" variant="accent">get in touch</Button>
	</div>
	<ScrollSegment>
		<TextBlock
			:tags="tags"
			:text="text"
			:callToAction="callToAction"
			class="lg:mt-44 col-span-full lg:col-span-8"
		/>
		<div class="mt-44 col-span-full" />
		<Rotor />
	</ScrollSegment>
	<ScrollSegment>
		<div class="mt-44 col-span-full" />
		<TextBlock
			:tags="tags"
			:text="text"
			:callToAction="callToAction"
			class="lg:mt-44 col-span-full lg:col-span-8"
		/>
		<div class="mt-44 col-span-full" />
		<Rotor />
	</ScrollSegment>
	<ScrollSegment>
		<div class="mt-44 col-span-full" />
		<TextBlock
			:tags="tags"
			:text="text"
			:callToAction="callToAction"
			class="lg:mt-44 col-span-full lg:col-span-8"
		/>
		<div class="mt-44 col-span-full" />
		<Rotor />
	</ScrollSegment>
	<ScrollSegment>
		<div class="mt-44 col-span-full" />
		<TextBlock
			:tags="tags"
			:text="text"
			:callToAction="callToAction"
			class="lg:mt-44 col-span-full lg:col-span-8"
		/>
		<div class="mt-44 col-span-full" />
		<Rotor />
	</ScrollSegment>
	<ScrollSegment>
		<div class="mt-44 col-span-full" />
		<TextBlock
			:tags="tags"
			:text="text"
			:callToAction="callToAction"
			class="lg:mt-44 col-span-full lg:col-span-8"
		/>
		<div class="mt-44 col-span-full" />
		<Rotor />
	</ScrollSegment>
</template>

<script setup lang="ts">
const landingContent = await queryContent('landing/hero').findOne()
const text = landingContent.description
const tags = landingContent.tags
const callToAction = landingContent.cta
console.log(landingContent.cta)

onMounted(() => {
	useScrollSegments()
})
</script>

<template>
	<div class="z-front max-lg:hidden w-44 h-8 justify-self-end col-start-12">
		<Button class="w-full" variant="accent">get in touch</Button>
	</div>
	<ScrollSegment>
		<TextBlock
			:contentPlug="landingContent"
			class="lg:mt-44 col-span-full lg:col-span-8"
		/>
		<div class="mt-44 col-span-full" />
		<Rotor />
	</ScrollSegment>
	<ScrollSegment>
		<div class="mt-44 col-span-full" />
		<TextBlock
			:tags="['this', 'is', 'a', 'test']"
			text="This is a test text. lol wuhu. power off."
			:callToAction="{ label: 'get in touch', to: '/contact' }"
			class="lg:mt-44 col-span-full lg:col-span-8"
		/>
		<TextBlock class="col-span-full" />
		<div class="mt-44 col-span-full" />
		<Rotor />
	</ScrollSegment>
</template>

<script setup lang="ts">
const landingContent = await queryContent<contentTextBlock>(
	'landing/hero'
).findOne()

onMounted(() => {
	useScrollSegments()
})
</script>

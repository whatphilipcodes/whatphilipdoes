<template>
	<div class="max-lg:hidden w-44 h-8 justify-self-end col-start-12">
		<Button class="w-full" variant="accent">get in touch</Button>
	</div>
	<TextBlock
		:tags="tags"
		:text="text"
		:callToAction="callToAction"
		class="lg:mt-44 col-span-full lg:col-span-8"
	/>
	<div id="spacer" class="mt-44 col-span-full" />
	<ScrollStop>
		<Rotor class="col-span-full lg:h-auto" />
	</ScrollStop>
	<TextBlock
		:tags="tags"
		:text="text"
		:callToAction="callToAction"
		class="lg:mt-44 col-span-full lg:col-span-8"
	/>
</template>

<script setup lang="ts">
const tags = ['frontend dev', 'machine learning', 'digital design']
const text =
	'Former design student turned creative developer. Focusing on ui design and implementation as well as machine learning in generative realms.'
const callToAction = { label: 'about philip', to: '/about' }
useComplexScroll()
</script>

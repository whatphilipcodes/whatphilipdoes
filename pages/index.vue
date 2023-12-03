<template>
	<div class="z-20 max-lg:hidden w-44 h-8 justify-self-end col-start-12">
		<Button class="w-full" variant="accent">get in touch</Button>
	</div>
	<TextBlock
		:tags="tags"
		:text="text"
		:callToAction="callToAction"
		class="lg:mt-44 col-span-4 lg:col-span-8"
	/>
	<Rotor class="mt-44 row-start-2 col-span-full h-screen lg:h-auto" />
</template>

<script setup lang="ts">
const tags = ['frontend dev', 'machine learning', 'digital design']
const text =
	'Former design student turned creative developer. Focusing on ui design and implementation as well as machine learning in generative realms.'
const callToAction = { label: 'about philip', to: '/about' }
</script>

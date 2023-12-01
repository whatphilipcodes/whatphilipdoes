<template>
	<NuxtPictureTest />
	<Nav />
	<Button
		@click="console.log('click')"
		class="h-20 w-20"
		variant="accent"
		:as="NuxtLink"
		>nuxt link</Button
	>
	<Button
		class="h-20 w-20"
		variant="basic"
		as="a"
		href="mailto:gerdes.philip%40gmail.com?subject=hi"
		>nuxt link</Button
	>
	<button class="h-20 w-20 bg-mono-700">button with long text</button>
	<button class="h-20 w-20 bg-mono-700">shorter text button</button>
	<button class="h-20 w-20 bg-mono-700">button</button>
	<button class="h-20 w-20 bg-mono-700">button</button>
	<!-- </div> -->
</template>

<script setup lang="ts">
import { NuxtLink } from '#components'
</script>

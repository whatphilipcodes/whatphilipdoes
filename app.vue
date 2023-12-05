<template>
	<div
		ref="mainScroll"
		@scroll=""
		class="absolute left-0 top-0 w-screen h-screen overflow-y-scroll text-mono-50 bg-mono-950"
	>
		<!-- <NuxtLayout>
			<NuxtPage />
		</NuxtLayout> -->
		<TestFlight />
	</div>
</template>

<script setup lang="ts">
import { useScroll } from '@vueuse/core'
const mainScroll = ref<HTMLElement | null>(null)
const { y } = useScroll(mainScroll)

// watch(y, (newValue) => {
// 	console.log('Scroll position changed:', newValue)
// })
</script>

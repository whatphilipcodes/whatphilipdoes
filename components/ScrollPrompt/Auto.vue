<template>
	<div class="fixed bottom-[16dvh] left-1/2 z-nav col-span-full">
		<ScrollPromptBase class="h-[16dvh] md:h-[24dvh]" :active="promptScroll" />
	</div>
</template>

<script setup lang="ts">
// scroll prompt
const { y } = useWindowScroll()
let timeout: NodeJS.Timeout
const promptScroll = ref(false)
watchEffect(() => {
	if (y.value < 80) {
		clearTimeout(timeout)
		timeout = setTimeout(() => {
			promptScroll.value = true
		}, 5000)
	} else {
		clearTimeout(timeout)
		promptScroll.value = false
	}
})
</script>

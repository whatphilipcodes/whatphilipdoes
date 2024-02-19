<template>
	<div class="fixed bottom-32 left-1/2 z-front lg:top-2/3">
		<ScrollPromptManual class="h-[20dvh]" :active="promptScroll" />
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

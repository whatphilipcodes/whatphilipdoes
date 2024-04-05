<template>
	<div class="absolute right-1/2 z-front -translate-y-1/2">
		<ScrollPromptBase
			:style="{ height: `${store.lvh * 0.08}px` }"
			:active="promptScroll"
		/>
	</div>
</template>

<script setup lang="ts">
const store = useGlobalStore()
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

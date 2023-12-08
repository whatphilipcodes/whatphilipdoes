<template>
	<div class="w-full z-front" ref="triggerElement"></div>
	<slot />
</template>

<script setup lang="ts">
const triggerElement = ref<HTMLElement | null>(null)
</script>

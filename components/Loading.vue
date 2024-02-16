<template>
	<div
		class="loading-gradient pointer-events-none fixed bottom-0 left-0 right-0 top-0 z-[80] h-screen w-screen transition-opacity duration-500"
	/>
</template>

<script setup lang="ts"></script>

<style scoped>
.loading-gradient {
	background: linear-gradient(to bottom, #180602 40%, #300d03 60%, #0d0d0d);
	background-size: 100% 200%;
	animation: gradient 1s linear infinite;
}

@keyframes gradient {
	0% {
		background-position: 0% 0%;
	}
	100% {
		background-position: 0% 200%;
	}
}
</style>

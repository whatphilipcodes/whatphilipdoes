<template>
	<div
		class="absolute top-0 z-nav h-16 w-full bg-gradient-to-b from-mono-950 md:hidden"
	></div>
	<div
		class="loading-gradient pointer-events-none fixed bottom-0 left-0 right-0 top-0 z-[80] h-screen w-screen transition-opacity duration-500"
	/>
</template>

<script setup lang="ts"></script>

<style scoped>
.loading-gradient {
	background: linear-gradient(
		to bottom,
		#0d0d0d 0%,
		#300d03 20%,
		#0d0d0d 40%,
		#0d0d0d 60%,
		#300d03 80%,
		#0d0d0d 100%
	);
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

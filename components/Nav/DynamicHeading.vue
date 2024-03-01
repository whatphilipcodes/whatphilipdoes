<template>
	<div
		data-info="dynamic-heading"
		class="pointer-events-auto absolute left-0 top-0 flex flex-col text-xl font-semibold leading-xl"
	>
		<div
			data-info="container-logo-top"
			class="gradient flex flex-row text-mono-500"
			:class="{
				'text-transparent': useGlobalStore().isTransitioning,
				'': !useGlobalStore().isTransitioning,
			}"
		>
			<span data-info="page" class="inline align-text-top">{{ page }}</span>
		</div>
		<div data-info="container-logo-bottom" class="flex flex-row text-mono-50">
			<span data-info="highlight">{{ highlight }}</span>
		</div>
	</div>
</template>

<script setup lang="ts">
defineProps(['highlight', 'page'])
</script>

<style lang="css" scoped>
/* .gradient {
	background: linear-gradient(
		to left,
		rgb(128 128 128) 0%,
		#0d0d0d 40%,
		#0d0d0d 60%,
		rgb(128 128 128) 100%
	);
	background-size: 200% 100%;
	-webkit-background-clip: text;
	animation: gradient 800ms infinite linear;
	transition: all 800ms;
}

@keyframes gradient {
	0% {
		background-position: 0% 0%;
	}
	100% {
		background-position: -200% 0%;
	}
} */
</style>

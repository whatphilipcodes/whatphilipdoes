<template>
	<div
		data-info="background"
		class="static-background fixed bottom-0 left-0 right-0 z-bottom h-lvh"
	/>
	<div id="app" lang="en" class="overflow-x-clip bg-mono-950 text-mono-50">
		<Nav />
		<NuxtPage :class="{ hidden: isLoading }" />
	</div>
	<Loading v-if="loaderMounted" :class="{ 'opacity-0': !isLoading }" />
</template>

<script lang="ts" setup>
const isLoading = ref(true)
const loaderMounted = ref(true)
onMounted(() => {
	setTimeout(() => {
		isLoading.value = false
	}, 300)
	setTimeout(() => {
		loaderMounted.value = false
	}, 1000)
})
</script>

<style lang="css">
.static-background {
	background: linear-gradient(rgb(13 13 13) 50%, rgb(26 26 26) 50%);
}

.fade-enter-active,
.fade-leave-active {
	opacity: 1;
	transition: all 0.3s;
}
.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>

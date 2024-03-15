<template>
	<div
		id="app"
		lang="en"
		class="bg-mono-950 text-mono-50 selection:bg-cinnabar-500"
	>
		<DynamicHeading />
		<NuxtPage
			:transition="{
				onAfterEnter: () => {
					store.setTransitioning(false)
				},
			}"
		/>
		<TouchActions />
	</div>
	<Loading v-if="loaderMounted" :class="{ 'opacity-0': !isLoading }" />
	<div
		data-info="transition-background"
		class="absolute bottom-0 -z-[990] h-full w-full bg-mono-950"
	/>
	<div
		data-info="static-background"
		class="background-gradient-split fixed bottom-0 left-0 right-0 z-bottom h-full w-full"
	/>
</template>

<script lang="ts" setup>
const store = useGlobalStore()
const loaderMounted = ref(true)
const isLoading = ref(true)

const content = await queryContent(useRoute().fullPath).findOne()

onBeforeMount(() => {
	store.setLvh(window)
})
onMounted(() => {
	store.setTransitioning(false)
	store.updateActiveSegment({
		buttons: content.segments[0].buttons ?? [],
	})
	setTimeout(() => {
		isLoading.value = false
	}, 300)
	setTimeout(() => {
		loaderMounted.value = false
	}, 1000)
})
</script>

<style lang="css">
.background-gradient-split {
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

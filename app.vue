<template>
	<div
		data-info="background"
		class="static-background fixed bottom-0 left-0 right-0 z-bottom h-lvh"
	/>
	<div id="app" lang="en" class="overflow-x-clip bg-mono-950 text-mono-50">
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</div>
	<div
		class="absolute top-0 z-[80] h-screen w-screen bg-mono-950 transition-opacity duration-1000"
		:class="{ 'opacity-0': !isLoading }"
	/>
</template>

<script lang="ts" setup>
const isLoading = ref(true)
onMounted(() => {
	isLoading.value = false
})
</script>

<style scoped lang="css">
.static-background {
	background: linear-gradient(rgb(13 13 13) 50%, rgb(26 26 26) 50%);
}
</style>

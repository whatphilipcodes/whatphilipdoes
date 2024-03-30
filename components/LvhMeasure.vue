<template>
	<div
		data-info="lvh-measure"
		class="pointer-events-none absolute top-0 h-lvh"
		ref="lvhMeasure"
	/>
	<div
		data-info="svh-measure"
		class="pointer-events-none absolute top-0 h-svh"
		ref="svhMeasure"
	/>
</template>

<script setup lang="ts">
const store = useGlobalStore()
const lvhMeasure = ref<HTMLElement>()
const svhMeasure = ref<HTMLElement>()

const lvh = computed(() => lvhMeasure.value?.clientHeight ?? 0)
const svh = computed(() => svhMeasure.value?.clientHeight ?? 0)

onMounted(() => {
	if (lvh.value == svh.value) store.setLvh(window.innerHeight)
	else store.setLvh(window.screen.availHeight)
})
</script>

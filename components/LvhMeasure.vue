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

const { height: lvh } = useElementSize(lvhMeasure)
const { height: svh } = useElementSize(svhMeasure)

onMounted(() => {
	if (lvh.value == svh.value) growLvh(window)
	else store.setLvh(lvh.value)
})

function growLvh(win: Window) {
	store.setLvh(win.innerHeight)
	win.addEventListener('resize', () => {
		if (store.lvh < lvh.value) store.setLvh(lvh.value)
	})
}
</script>

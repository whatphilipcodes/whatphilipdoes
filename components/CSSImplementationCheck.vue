<template>
	<div
		data-info="lvh-measure"
		class="pointer-events-none fixed top-0 h-lvh"
		ref="lvhMeasure"
	/>
	<div
		data-info="svh-measure"
		class="pointer-events-none fixed top-0 h-svh"
		ref="svhMeasure"
	/>
	<Banner confirm-text="close" :external-visibility="show">{{ msg }}</Banner>
</template>

<script setup lang="ts">
const lvhMeasure = ref<HTMLElement>()
const svhMeasure = ref<HTMLElement>()

const { height: lvh } = useElementSize(lvhMeasure)
const { height: svh } = useElementSize(svhMeasure)

const isDynamicUI = ref(false)
const device = useDeviceType()

const msg = ref(
	'Unfortunately, your browser does not yet fully support screen size-dependent CSS units. For the best experience, please consider using a standalone browser like Chrome or Safari.',
)

const show = computed(
	() =>
		lvh.value === svh.value && device.value === 'touch' && isDynamicUI.value,
)

useResizeObserver([lvhMeasure, svhMeasure], () => {
	if (lvh.value > 0 && svh.value > 0) {
		isDynamicUI.value = true
	}
})
</script>

<template>
	<LayoutPadding
		class="fixed bottom-0 z-nav w-full gap-4 transition-opacity duration-300"
		:class="opacity"
	>
		<Button
			v-for="button in buffer.slice(0, 2)"
			class="col-span-full h-12 hyphens-manual"
			class-overrides="p-3 items-start justify-start"
			:to="typeof button.to === 'string' ? button.to : undefined"
			:callback="typeof button.to === 'function' ? button.to : undefined"
			:variant="button.variant ?? 'basic'"
			:download="button.download ?? undefined"
			>{{ button.label }}</Button
		>
	</LayoutPadding>
</template>

<script setup lang="ts">
const segment = useGlobalStore().activeSegment
const buttons = computed(() => segment.buttons)

const opaque = ref(true)
let buffer: Ref<buttonData[]> = ref([])
let empty = true

watch(segment, () => {
	if (!buttons.value) return
	if (buttons.value.length === 0) {
		if (empty) return
		opaque.value = false
		setTimeout(() => {
			empty = true
			buffer.value = []
			opaque.value = true
		}, 300)
	} else {
		empty = false
		buffer.value = buttons.value
		opaque.value = true
	}
})

const opacity = computed(() => {
	return {
		'opacity-0': !opaque.value,
	}
})
</script>

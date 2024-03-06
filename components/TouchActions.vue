<template>
	<LayoutPadding
		class="fixed bottom-0 z-nav w-full gap-4 transition-opacity duration-300 lg:hidden"
		:class="opacity"
	>
		<Button
			v-for="button in buffer.slice(0, 2)"
			class="col-span-full h-14 hyphens-manual"
			:class-overrides="tw`pl-3 items-center justify-start`"
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
let pendingReset: NodeJS.Timeout

watch(segment, () => {
	if (!buttons.value) return
	if (buttons.value.length === 0) {
		opaque.value = false
		pendingReset = setTimeout(() => {
			buffer.value = []
			opaque.value = true
		}, 300)
	} else {
		clearTimeout(pendingReset)
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

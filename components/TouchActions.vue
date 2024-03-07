<template>
	<LayoutPadding
		class="fixed bottom-0 z-nav w-full gap-4 transition-opacity duration-300 lg:hidden"
		:class="opacity"
	>
		<Button
			v-for="button in segment.buttons?.slice(0, 2)"
			class="col-span-full flex h-14 hyphens-manual"
			:class-overrides="tw`pl-4 pr-6 items-center flex-row justify-between`"
			:to="typeof button.to === 'string' ? button.to : undefined"
			:callback="typeof button.to === 'function' ? button.to : undefined"
			:variant="button.variant ?? 'basic'"
			:download="button.download ?? undefined"
			>{{ button.label }}
			<!-- <div class="h-4 w-4 border" /> -->
		</Button>
	</LayoutPadding>
</template>

<script setup lang="ts">
const segment = useGlobalStore().activeSegment
const buttons = computed(() => segment.buttons)

// const opaque = ref(true)
let buffer: Ref<buttonData[]> = ref([])
let pendingReset: NodeJS.Timeout

watch(segment, () => {
	if (!buttons.value) return
	if (buttons.value.length === 0) {
		// opaque.value = false
		pendingReset = setTimeout(() => {
			buffer.value = []
			// opaque.value = true
		}, 300)
	} else {
		clearTimeout(pendingReset)
		buffer.value = buttons.value
		// opaque.value = true
	}
})

const opacity = computed(() => {
	return '' /* {
		'opacity-0': !opaque.value,
		
	}*/
})
</script>

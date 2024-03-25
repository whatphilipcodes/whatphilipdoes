<template>
	<div
		class="pointer-events-none absolute top-0 flex h-full w-full text-cinnabar-500 transition-opacity duration-300"
		:class="{ 'opacity-0': !props.restartable }"
	>
		<div class="relative bottom-0 flex w-full self-end lg:sticky">
			<LayoutPadding class="absolute bottom-0 left-0 right-0">
				<div class="col-span-full self-end text-cinnabar-500">
					{{ prompt }}
				</div>
			</LayoutPadding>
		</div>
	</div>
</template>

<script setup lang="ts">
const store = useGlobalStore()
const props = defineProps({
	restartable: {
		type: Boolean,
		required: false,
	},
})

const input = useDeviceType()
const prompt = computed(() => {
	switch (input.value) {
		case 'mouse':
			return 'click to have another look'
			break

		default:
			return 'tap to have another look'
			break
	}
})
</script>

<style scoped></style>

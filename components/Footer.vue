<template>
	<div
		data-info="footer-wrapper"
		class="relative col-span-full w-screen place-self-center self-center justify-self-center"
	>
		<div
			v-if="props.segment"
			data-info="segment-trigger"
			class="absolute bottom-0 z-bottom h-[56dvh] w-full"
		>
			<ScrollSegment :page-segment="props.segment">
				<div class="relative h-full w-full" />
			</ScrollSegment>
		</div>
		<div class="h-full w-screen justify-self-center bg-mono-900">
			<LayoutPadding
				data-info="footer"
				class="h-[200px] bg-mono-900 max-sm:translate-y-[1px] md:h-[248px] lg:h-[88px]"
			>
				<TouchableLink class="h-fit" href="/legal/imprint"
					>imprint</TouchableLink
				>
				<TouchableLink class="h-fit" href="/legal/privacy"
					>privacy</TouchableLink
				>
			</LayoutPadding>
		</div>
	</div>
</template>

<script setup lang="ts">
const props = defineProps({
	segment: {
		type: Object as PropType<pageSegment>,
		default: undefined,
	},
})
</script>

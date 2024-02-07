<template>
	<div
		data-info="footer-wrapper"
		class="relative justify-self-center self-center place-self-center col-span-full w-screen"
	>
		<div
			v-if="props.segment"
			data-info="segment-trigger"
			class="absolute z-bottom bottom-0 h-[56vh] w-full"
		>
			<ScrollSegment :page-segment="props.segment">
				<div class="relative w-full h-full"></div>
			</ScrollSegment>
		</div>
		<div class="bg-mono-900 w-screen h-full justify-self-center">
			<LayoutPadding
				data-info="footer"
				class="bg-mono-900 max-sm:translate-y-[1px] h-52 md:h-60 lg:h-[88px]"
			>
				<TouchableLink href="/legal/imprint">imprint</TouchableLink>
				<TouchableLink href="/legal/privacy">privacy</TouchableLink>
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

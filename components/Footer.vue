<template>
	<div
		data-info="footer-wrapper"
		class="relative col-span-full w-screen place-self-center self-center justify-self-center"
	>
		<div
			v-if="props.segment"
			data-info="segment-trigger"
			class="absolute bottom-0 z-bottom h-96 w-full lg:h-[56vh]"
		>
			<ScrollSegment :page-segment="props.segment">
				<div class="relative h-full w-full"></div>
			</ScrollSegment>
		</div>
		<div class="h-full w-screen justify-self-center bg-mono-900">
			<LayoutPadding
				data-info="footer"
				class="h-52 bg-mono-900 max-sm:translate-y-[1px] md:h-60 lg:h-[88px]"
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

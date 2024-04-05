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
		<div class="mt-4 w-screen justify-self-center bg-mono-900 md:mt-8 lg:mt-12">
			<div
				data-info="footer"
				class="flex flex-col gap-4 bg-mono-900 pb-4 pt-4 max-sm:translate-y-[1px] md:pb-8 lg:h-24 lg:justify-center lg:pt-8"
			>
				<LayoutColumns class="h-7 w-screen justify-self-center"
					><div class="flex flex-col justify-center">
						<TouchableLink href="/legal/imprint">imprint</TouchableLink>
					</div>
					<div class="flex flex-col justify-center">
						<TouchableLink href="/legal/privacy">privacy</TouchableLink>
					</div></LayoutColumns
				>
				<div class="h-14 lg:hidden" />
				<div class="h-14 lg:hidden" />
			</div>
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

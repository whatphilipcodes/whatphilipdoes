<template>
	<div
		id="menu"
		class="fixed left-0 bottom-0 lg:top-0 h-36 w-full pointer-events-none z-nav"
	>
		<NavDissolver />
		<Grid class="absolute top-0 w-full h-full">
			<div class="relative col-span-full h-full flex-grow-0">
				<NavDynamicHeading
					:prefix="activeSegment.dynHeadPrefix"
					:highlight="activeSegment.dynHeadHighlight"
				/>
				<NavControlTouch class="lg:hidden" :buttons="activeSegment.buttons" />
			</div>
		</Grid>
	</div>
</template>

<script setup lang="ts">
const { activeSegment } = useGlobalStore()
</script>

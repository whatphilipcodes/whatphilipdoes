<template>
	<NuxtLink
		id="menu"
		class="fixed left-0 bottom-0 lg:top-0 h-36 w-full pointer-events-none z-nav"
		to="/"
	>
		<NavDissolver />
		<LayoutPadding class="absolute top-0 w-full h-full">
			<div class="relative col-span-full h-full flex-grow-0">
				<NavDynamicHeading
					:page="store.$state.activePage.page"
					:highlight="store.$state.activeSegment.title"
				/>
				<NavControlTouch
					class="lg:hidden"
					:buttons="store.$state.activeSegment.buttons"
				/>
			</div>
		</LayoutPadding>
	</NuxtLink>
</template>

<script setup lang="ts">
const store = useGlobalStore()
</script>

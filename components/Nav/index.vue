<template>
	<div id="menu" class="fixed left-0 bottom-0 lg:top-0 h-36 w-full z-nav">
		<NavDissolver />
		<LayoutPadding class="absolute top-0 w-full h-full">
			<div class="relative col-span-full h-full flex-grow-0">
				<NuxtLink to="/"
					><NavDynamicHeading
						:page="store.$state.activePage.page"
						:highlight="store.$state.activeSegment.title"
				/></NuxtLink>

				<NavControlTouch
					class="lg:hidden"
					:buttons="store.$state.activeSegment.buttons"
				/>
			</div>
		</LayoutPadding>
	</div>
</template>

<script setup lang="ts">
const store = useGlobalStore()
</script>

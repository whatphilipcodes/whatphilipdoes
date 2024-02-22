<template>
	<div data-info="menu" class="fixed top-0 z-nav mx-auto h-36 w-full">
		<NavDissolver />
		<LayoutPadding class="h-full w-full">
			<div class="relative col-span-full h-full flex-grow-0">
				<NuxtLink to="/"
					><NavDynamicHeading
						:page="store.$state.activePage"
						:highlight="store.$state.activeSegment.name"
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

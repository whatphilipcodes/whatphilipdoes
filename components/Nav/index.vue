<template>
	<div
		data-info="menu"
		class="fixed bottom-0 lg:top-0 h-36 w-full z-nav mx-auto"
	>
		<NavDissolver />
		<LayoutPadding class="w-full h-full">
			<div class="relative col-span-full h-full flex-grow-0">
				<NuxtLink to="/"
					><NavDynamicHeading
						:page="store.$state.activePage"
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

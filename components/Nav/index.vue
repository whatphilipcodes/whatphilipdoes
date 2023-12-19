<template>
	<div
		id="menu"
		class="fixed left-0 bottom-0 lg:top-0 h-36 w-full pointer-events-none z-nav"
	>
		<NavDissolver />
		<Grid class="absolute top-0 w-full h-full">
			<div class="relative col-span-full h-full flex-grow-0">
				<NavDynamicHeading class="mb-[6px]" prefix="what" highlight="does" />
				<NavControlTouch class="mb-4 lg:hidden" />
			</div>
		</Grid>
	</div>
</template>

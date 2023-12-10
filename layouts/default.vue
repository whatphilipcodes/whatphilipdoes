<template>
	<div
		id="grid-container"
		class="grid grid-flow-col grid-cols-4 md:grid-cols-8 lg:grid-cols-12 mx-4 md:mx-8 lg:mx-32 mt-4 md:mt-6 lg:mt-8 gap-4 md:gap-6 lg:gap-8 justify-items-center"
	>
		<slot />
	</div>
	<Nav />
</template>

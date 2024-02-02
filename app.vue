<template>
	<div id="app" lang="de" class="text-mono-50 bg-mono-950 overflow-x-clip">
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</div>
	<div
		data-info="background"
		class="static-background fixed z-bottom h-lvh bottom-0 left-0 right-0"
	>
		<div
			class="absolute right-0 max-md:top-0 lg:bottom-0 text-cinnabar-500 px-4 md:px-8 lg:px-32 mx-auto max-w-[1440px] py-8"
		>
			{{ new Date().getFullYear() }}, made in berlin.
		</div>
	</div>
</template>

<style scoped lang="css">
.static-background {
	background: linear-gradient(rgb(13 13 13) 50%, rgb(26 26 26) 50%);
}
</style>

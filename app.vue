<template>
	<div id="app" lang="de" class="text-mono-50 bg-mono-950 overflow-x-clip">
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</div>
	<div
		data-info="background"
		class="static-background fixed z-bottom h-lvh bottom-0 left-0 right-0"
	></div>
</template>

<style scoped lang="css">
.static-background {
	background: linear-gradient(rgb(13 13 13) 50%, rgb(26 26 26) 50%);
}
</style>

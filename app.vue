<template>
	<div id="app" lang="en" class="overflow-x-clip bg-mono-950 text-mono-50">
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</div>
	<div
		data-info="background"
		class="static-background fixed bottom-0 left-0 right-0 z-bottom h-lvh"
	/>
</template>

<style scoped lang="css">
.static-background {
	background: linear-gradient(rgb(13 13 13) 50%, rgb(26 26 26) 50%);
}
</style>

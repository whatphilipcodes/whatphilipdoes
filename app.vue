<template>
	<!-- although bg is already set via bodyAttrs in nuxt.config.ts this is necessary to keep the class from being purged. -->
	<div class="text-mono-50">
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</div>
</template>

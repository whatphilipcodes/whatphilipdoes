<template>
	<NuxtPictureTest />
	<Nav />
	<Button
		variant="accent"
		as="a"
		href="mailto:gerdes.philip%40gmail.com?subject=hi"
		>get in touch</Button
	>
	<Button :as="NuxtLink" to="/linkTest">nuxt link</Button>
</template>

<script setup lang="ts">
import { NuxtLink } from '#components'
</script>

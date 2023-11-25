<script setup>
definePageMeta({
	layout: 'custom',
})
const { $sayHello } = useNuxtApp()
$sayHello(',Philip')
</script>
<template>
	<p>Custom layout should be displayed here</p>
	<nuxt-img src="img/becher-output.jpg" alt="" />
	<ContentDoc />
</template>

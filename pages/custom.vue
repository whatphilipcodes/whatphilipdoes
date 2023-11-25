<script setup>
definePageMeta({
	layout: 'custom',
})
const { $sayHello } = useNuxtApp()
$sayHello(',Philip')
</script>
<template>
	<p>Custom layout should be displayed here</p>
	<img src="@/assets/becher-output.jpg" alt="" />
</template>

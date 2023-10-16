<template>
	<div>
		<h1>About</h1>
		<p>This is the about page. When the page is opened this view is shown.</p>
		<p>Fetch from backend: {{ data }}</p>
	</div>
</template>

<script setup lang="ts">
const { data } = useFetch('api/confidential?test=testing', {
	method: 'POST',
	body: { testnumber: 56 },
})
</script>

<style scoped></style>

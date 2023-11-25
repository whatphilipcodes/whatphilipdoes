<template>
	<div class="CustomLayout">
		<p>Custom Layout</p>
		<slot />
	</div>
</template>

<script setup>
const { sayHello } = useUtils()
sayHello()
</script>

<template>
	<ContentDoc v-slot="{ doc }">
		<main class="col-span-full mb-56 lg:mb-32 lg:mt-24">
			<ContentRenderer :value="doc" />
		</main>
	</ContentDoc>
</template>

<script setup lang="ts"></script>

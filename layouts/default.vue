<template>
	<div>
		<header class="shadow-sm">
			<nav class="container mx-auto">
				<NuxtLink to="/">whatphilipdoes</NuxtLink>
				<ul class="flex gap-4">
					<li><NuxtLink to="/">Home</NuxtLink></li>
					<li><NuxtLink to="/about">About</NuxtLink></li>
					<li><NuxtLink to="/projects">Projects</NuxtLink></li>
				</ul>
			</nav>
		</header>
		<!-- page content below this -->
		<div class="container mx-auto p-4">
			<slot />
		</div>
	</div>
</template>

<script setup lang="ts"></script>

<style scoped>
.router-link-exact-active {
	color: #12b488;
}
</style>

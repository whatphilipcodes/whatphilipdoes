<template>
	<div>
		<header class="flex-col space-y-4 h-1/5 bg-black p-4">
			<nav class="container mx-auto">
				<NuxtLink to="/">whatphilipdoes</NuxtLink>
				<ul class="flex gap-4">
					<li class="bg-orange-600 h-full w-full rounded-lg text-center">
						<NuxtLink to="/">Home</NuxtLink>
					</li>
					<li class="bg-orange-600 h-full w-full rounded-lg text-center">
						<NuxtLink to="/about">About</NuxtLink>
					</li>
					<li class="bg-orange-600 h-full w-full rounded-lg text-center">
						<NuxtLink to="/projects">Projects</NuxtLink>
					</li>
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
	color: #da612b;
}
</style>

<template>
	<div>
		<header>
			<nav>
				<NuxtLink to="/">whatphilipdoes</NuxtLink>
			</nav>
		</header>
		<!-- page content below this -->
		<div>
			<slot />
		</div>
		<footer>
			<ul>
				<li><NuxtLink to="/">Home</NuxtLink></li>
				<li><NuxtLink to="/about">About</NuxtLink></li>
				<li><NuxtLink to="/projects">Projects</NuxtLink></li>
			</ul>
		</footer>
	</div>
</template>

<script setup lang="ts"></script>

<style scoped>
.router-link-exact-active {
	color: #12b488;
}
</style>

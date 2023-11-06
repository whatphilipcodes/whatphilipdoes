<template>
	<div>
		<form action="" method="get">
			<div>
				<label for="name">name</label>
				<input type="text" name="name" id="name" required />
			</div>
			<div>
				<label for="email">mail</label>
				<input type="email" name="email" id="email" required />
			</div>
			<div>
				<input type="submit" value="versenden" />
			</div>
		</form>
	</div>
</template>

<script setup lang="ts"></script>

<style scoped></style>

<template>
	<div data-info="page-root">
		<LayoutColumns>
			<ContentDoc v-slot="{ doc }">
				<ContentRenderer
					:value="doc"
					tag="div"
					class="col-span-full lg:mt-32"
				/>
			</ContentDoc>
		</LayoutColumns>
		<div class="h-8"></div>
		<Footer />
	</div>
</template>

<script setup lang="ts">
useHead({
	meta: [{ name: 'robots', content: 'none' }],
})
</script>

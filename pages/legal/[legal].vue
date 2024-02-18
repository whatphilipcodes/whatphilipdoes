<template>
	<TransitionWrapper>
		<LayoutColumns>
			<ContentDoc v-slot="{ doc }">
				<ContentRenderer
					:value="doc"
					tag="div"
					class="col-span-full lg:mt-32"
				/>
				<div class="h-8" />
				<Footer />
			</ContentDoc>
		</LayoutColumns>
	</TransitionWrapper>
</template>

<script setup lang="ts">
useHead({
	meta: [{ name: 'robots', content: 'none' }],
})
</script>

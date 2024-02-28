<template>
	<TransitionWrapper>
		<div lang="de">
			<LayoutColumns>
				<ContentDoc v-slot="{ doc }">
					<ContentRenderer :value="doc" tag="div" class="col-span-full mt-36" />
					<div class="h-8" />
					<Footer />
				</ContentDoc>
			</LayoutColumns>
		</div>
	</TransitionWrapper>
</template>

<script setup lang="ts">
useHead({
	meta: [{ name: 'robots', content: 'none' }],
})
</script>

<template>
	<TransitionWrapper>
		<ContentDoc v-slot="{ doc }">
			<ContentRenderer
				:value="doc"
				tag="layout-columns"
				class="gap-y-12 pb-8 md:pb-12"
			/>
			<Footer :segment="doc.footer" />
		</ContentDoc>
	</TransitionWrapper>
</template>

<script setup lang="ts">
useScrollSegments()
</script>

<template>
	<TransitionWrapper>
		<ContentDoc v-slot="{ doc }">
			<ContentRenderer :value="doc" tag="layout-columns" class="gap-y-12" />
			<PageFooter :segment="doc.footer" />
		</ContentDoc>
	</TransitionWrapper>
</template>

<script setup lang="ts">
useScrollSegments()
</script>

<template>
	<TransitionWrapper>
		<div lang="de">
			<LayoutColumns>
				<ContentRenderer
					class="col-span-full mt-[136px] flex md:col-span-2 lg:col-span-4"
					v-if="notice"
					:value="notice"
				/>
				<ContentDoc v-slot="{ doc }">
					<ContentRenderer
						:value="doc"
						tag="div"
						class="col-start-1 col-end-[-1] mt-0 md:col-start-4 md:mt-12 lg:col-start-6"
					/>
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

const { data: notice } = await useAsyncData(() =>
	queryContent('legal').where({ _partial: true }).findOne(),
)
</script>

<template>
	<div
		data-info="menu"
		class="pointer-events-none fixed left-0 top-0 z-nav w-full"
	>
		<div
			data-info="dissolver"
			class="absolute top-0 h-36 w-full bg-gradient-to-b from-mono-950"
		/>
		<LayoutPadding class="relative">
			<div class="col-span-full flex h-fit">
				<NuxtLink
					to="/"
					data-info="heading"
					class="pointer-events-auto col-span-3 text-xl font-semibold leading-xl"
				>
					<span data-info="page" class="inline text-mono-600">{{
						store.activePage
					}}</span
					><br />
					<span data-info="highlight" class="inline text-mono-50">{{
						store.activeSegment.name
					}}</span>
				</NuxtLink>
			</div>
		</LayoutPadding>
	</div>
</template>

<script setup lang="ts">
const store = useGlobalStore()
</script>

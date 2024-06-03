<template>
	<div
		data-info="banner"
		class="fixed top-0 flex w-full flex-col bg-cinnabar-900 transition-opacity duration-500"
		:class="{ 'pointer-events-none opacity-0': !isVisible }"
	>
		<LayoutPadding class="h-fit w-full">
			<div
				class="col-span-full h-fit self-end pt-40 text-cinnabar-500 lg:col-span-6"
			>
				<div>
					<slot />
				</div>
				<Button
					class="col-span-full mt-4 flex h-14 md:mt-8 lg:h-10 lg:w-44"
					class-overrides="justify-start pl-4 lg:justify-center lg:pl-0 "
					:callback="closeBanner"
					variant="accent"
					>{{ props.confirmText.toLowerCase() }}</Button
				>
			</div>
		</LayoutPadding>
	</div>
</template>

<script setup lang="ts">
const props = defineProps({
	confirmText: {
		type: String,
		default: 'Got it',
	},
	toogleCallback: {
		type: Function,
		default: () => {},
	},
	externalVisibility: {
		type: Boolean,
		default: null,
	},
})
const isClosed = ref(false)
const isVisible = computed(() => {
	if (props.externalVisibility !== null && !isClosed.value) {
		return props.externalVisibility
	} else {
		return !isClosed.value
	}
})

const closeBanner = () => {
	isClosed.value = true
	props.toogleCallback()
}
</script>

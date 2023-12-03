<template>
	<component :is="props.as">
		<button :class="buttonClasses">
			<slot />
		</button>
	</component>
</template>

<script setup lang="ts">
// inspired by -> https://www.youtube.com/watch?v=0-h16HmNmVY
// when using standard nuxt 3 components they need to imported into the parent component and then passed through the 'as' prop
import { NuxtLink } from '#components'

const props = defineProps({
	as: {
		type: [String, Object],
		default: NuxtLink,
	},
	variant: {
		type: String,
		validator: (value: string) => ['basic', 'accent'].includes(value),
		default: 'basic',
	},
})

const buttonClasses = computed(() => {
	return {
		'select-none py-1 px-2 border w-full h-full': true,
		'border-mono-900 bg-mono-900 active:bg-mono-50 active:border-mono-50 lg:hover:bg-mono-800 lg:hover:border-mono-800 lg:active:bg-mono-50 lg:active:border-mono-50':
			props.variant === 'basic',
		'text-cinnabar-500 border-cinnabar-500 active:bg-cinnabar-500 lg:hover:bg-cinnabar-500/20 lg:active:bg-cinnabar-500':
			props.variant === 'accent',
	}
})
</script>

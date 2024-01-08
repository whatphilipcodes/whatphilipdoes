<template>
	<component :is="props.as" :target="target" :download="download">
		<button :class="buttonClasses" @click="callback?.()">
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
	callback: {
		type: Function as PropType<() => any>,
		default: null,
		required: false,
	},
	variant: {
		type: String,
		validator: (value: string) => ['basic', 'accent', 'dark'].includes(value),
		default: 'basic',
	},
	download: {
		type: String,
		default: null,
	},
})

const buttonClasses = computed(() => {
	return {
		'persistent-default flex items-center justify-center select-none py-1 px-2 border w-full h-full group':
			true,
		'border-mono-800 bg-mono-800 active:bg-mono-50 active:border-mono-50 lg:hover:bg-mono-600 lg:hover:border-mono-600 lg:active:bg-mono-50 lg:active:border-mono-50':
			props.variant === 'basic',
		'text-cinnabar-500 border-cinnabar-500 active:bg-cinnabar-500 lg:hover:bg-cinnabar-500/20 lg:active:bg-cinnabar-500':
			props.variant === 'accent',
		'border-mono-900 bg-mono-900 active:bg-mono-50 active:border-mono-50 lg:hover:bg-mono-800 lg:hover:border-mono-800 lg:active:bg-mono-50 lg:active:border-mono-50':
			props.variant === 'dark',
	}
})

const target = computed(() => {
	if (props.download) return '_blank'
	return ''
})
</script>

<template>
	<component :is="props.as" :target="target" :download="download">
		<!-- <component> -->
		<button
			class="persistent-default flash-enter flex h-full w-full select-none items-center justify-center border transition-colors"
			:class="buttonBaseClasses"
			@click="callback?.()"
		>
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
	paddingOverride: {
		type: String,
		default: undefined,
	},
})

const target = computed(() => {
	if (props.download) return '_blank'
	return ''
})

const buttonBaseClasses = computed(() => {
	return {
		[props.paddingOverride ?? 'p-1']: true,
		'bg-mono-800 border-mono-800 hover:text-mono-50 hover:bg-mono-600 hover:border-mono-600  active:text-mono-50 active:bg-mono-50 active:border-mono-50 ':
			props.variant === 'basic',
		'text-cinnabar-500 border-cinnabar-500 hover:bg-cinnabar-500/20 active:bg-cinnabar-500':
			props.variant === 'accent',
		'text-mono-500 bg-mono-900 border-mono-900 hover:text-mono-50 hover:bg-mono-800 hover:border-mono-800 active:text-mono-50 active:bg-mono-50 active:border-mono-50':
			props.variant === 'dark',
	}
})
</script>

<template>
	<component :is="props.as" :target="target" :download="download">
		<button
			ref="buttonElement"
			class="persistent-default transition-colors ease-in-out duration-300 flex items-center justify-center select-none border w-full h-full group'"
			:class="buttonBaseClasses"
			@click="callback?.()"
			@touchstart="setActive"
			@touchend="resetActive"
			@mousedown="setActive"
			@mouseup="resetActive"
		>
			<slot class="group-hover:text-mono-50" />
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
		'bg-mono-800 border-mono-800 hover:bg-mono-600 hover:border-mono-600 active:bg-mono-50 active:border-mono-50':
			props.variant === 'basic',
		'text-cinnabar-500 border-cinnabar-500 hover:bg-cinnabar-500/20 active:bg-cinnabar-500':
			props.variant === 'accent',
		'text-mono-500 bg-mono-900 border-mono-900 hover:text-mono-50 hover:bg-mono-800 hover:border-mono-800 active:bg-mono-50 active:border-mono-50':
			props.variant === 'dark',
	}
})

// custom active state (default not working on ios safari)
const buttonActiveClasses = computed(() => {
	const classesMap = new Map()
	classesMap.set('basic', {
		inactive: ['bg-mono-800', 'border-mono-800', 'text-mono-500'],
		active: ['bg-mono-50', 'border-mono-50', 'text-mono-50'],
	})
	classesMap.set('accent', {
		inactive: [],
		active: ['bg-cinnabar-500'],
	})
	classesMap.set('dark', {
		inactive: ['bg-mono-900', 'border-mono-900', 'text-mono-500'],
		active: ['bg-mono-50', 'border-mono-50', 'text-mono-50'],
	})
	return classesMap.get(props.variant)
})

const buttonElement = ref<HTMLButtonElement | null>(null)
let clearAutoReset: NodeJS.Timeout | null = null
function setActive() {
	buttonElement.value?.classList.remove(
		...buttonActiveClasses.value.inactive,
		'transition-colors',
		'ease-in-out',
		'duration-300'
	)
	buttonElement.value?.classList.add(...buttonActiveClasses.value.active)
	clearAutoReset = setTimeout(resetActive, 500)
}
function resetActive() {
	clearTimeout(clearAutoReset!)
	buttonElement.value?.classList.remove(...buttonActiveClasses.value.active)
	buttonElement.value?.classList.add(
		...buttonActiveClasses.value.inactive,
		'transition-colors',
		'ease-in-out',
		'duration-300'
	)
}
</script>

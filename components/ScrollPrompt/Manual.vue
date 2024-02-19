<template>
	<div
		class="transition-opacity duration-500"
		:class="{ 'opacity-0': !props.active }"
	>
		<div
			v-if="props.direction == 'top-bottom'"
			class="scroll-animation-tb h-56 w-[1px]"
			:class="{ [props.class]: true }"
		/>
		<div
			v-else
			class="scroll-animation-lr h-[1px] w-56"
			:class="{ [props.class]: true }"
		/>
	</div>
</template>

<script setup lang="ts">
const props = defineProps({
	direction: {
		type: String,
		validator: (value: string) => ['top-bottom', 'left-right'].includes(value),
		default: 'top-bottom',
		required: false,
	},
	active: {
		type: Boolean,
		required: true,
	},
	class: {
		type: String,
		default: '',
		required: false,
	},
})
</script>

<style scoped>
.scroll-animation-tb {
	background: linear-gradient(to bottom, #f2f2f2 0%, #f2f2f200 50%);
	background-size: 100% 200%;
	animation: ani-tb 1s linear infinite;
}
.scroll-animation-lr {
	background: linear-gradient(to right, #f2f2f2 0%, #f2f2f200 50%);
	background-size: 200% 100%;
	animation: ani-tr 1s linear infinite;
}

@keyframes ani-tb {
	0% {
		background-position: 0% 0%;
	}
	100% {
		background-position: 0% 200%;
	}
}
@keyframes ani-tr {
	0% {
		background-position: 0% 0%;
	}
	100% {
		background-position: 200% 0%;
	}
}
</style>

<template>
	<div
		class="col-span-full grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-4 pb-20"
	>
		<div class="text-mono-500">team</div>
		<template v-for="(person, index) in props.team" class="">
			<div
				class="col-start-1 md:col-start-2 lg:col-start-3 col-span-2 row-span-1 self-end"
				:class="'row-start-' + index + 1"
			>
				<div v-for="name in person.name">{{ name.toLowerCase() }}</div>
			</div>
			<div
				class="col-start-3 md:col-start-4 lg:col-start-6 col-span-2 row-span-1 self-end text-mono-500"
				:class="'row-start-' + index + 1"
			>
				{{ person.role.toLowerCase() }}
			</div>
		</template>
	</div>
</template>

<script setup lang="ts">
const props = defineProps({
	team: {
		type: Array as PropType<
			{
				name: string[]
				role: string
			}[]
		>,
		required: true,
	},
})
</script>

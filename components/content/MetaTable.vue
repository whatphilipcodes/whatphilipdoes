<template>
	<div
		class="col-span-full grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-4"
		v-for="section in props.content"
	>
		<div class="text-mono-500">
			{{ section.title.toLowerCase() }}
		</div>
		<template v-for="(row, rowdex) in section.rows">
			<div
				v-for="(col, coldex) in row.cols"
				class="self-end"
				:class="`col-start-${
					coldex * cellDimensions.colSpan + 1
				} md:col-start-${coldex * cellDimensions.colSpan + 2} lg:col-start-${
					coldex * cellDimensions.colSpan + 3
				} col-span-${cellDimensions.colSpan} row-start-${
					rowdex * cellDimensions.rowSpan + 2
				} md:row-start-${rowdex * cellDimensions.rowSpan + 1} row-span-${
					cellDimensions.rowSpan
				} odd:text-mono-500`"
			>
				<div v-if="Array.isArray(col)" v-for="item in col">
					{{ item.toLowerCase() }}
				</div>
				<div v-else>{{ col.toLowerCase() }}</div>
			</div>
		</template>
	</div>
</template>

<script setup lang="ts">
const cellDimensions = {
	rowSpan: 1,
	colSpan: 2,
}

const props = defineProps({
	content: {
		type: Array as PropType<
			{
				title: string
				rows: {
					cols: string[]
				}[]
			}[]
		>,
		required: true,
	},
})
</script>

<template>
	<LayoutColumns class="gap-y-4 pt-8 pb-20">
		<div class="col-start-1 row-start-1 text-mono-500">team</div>
		<template v-for="(person, index) in team" class="">
			<div
				class="col-start-1 md:col-start-2 lg:col-start-3 col-span-2 row-span-1"
				:class="'row-start-' + index + 1"
			>
				<div v-for="name in person.name">{{ name }}</div>
			</div>
			<div
				class="col-start-3 md:col-start-4 lg:col-start-6 col-span-2 row-span-1 self-end text-mono-500"
				:class="'row-start-' + index + 1"
			>
				{{ person.role }}
			</div>
		</template>
	</LayoutColumns>
</template>

<script setup lang="ts">
const team = [
	{
		name: ['moritz schell'],
		role: 'betreuung',
	},
	{
		name: ['lara ketzenberg', 'philip gerdes'],
		role: 'konzept',
	},
	{
		name: ['lara ketzenberg'],
		role: 'konstruktion',
	},
	{
		name: ['philip gerdes'],
		role: 'software',
	},
]

const links: buttonData[] = [
	{
		label: 'SvgoGithub',
		to: '',
	},
	{
		label: 'SvgoArselectro',
		to: '',
	},
]
</script>

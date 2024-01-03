<template>
	<ScrollStop>
		<ScrollSegment :pageSegment="segmentsContent[0].segment">
			<div
				class="z-front max-lg:hidden w-44 h-10 justify-self-end col-start-12"
			>
				<Button
					class="w-full"
					:to="
						segmentsContent[0].segment.buttons
							? segmentsContent[0].segment.buttons[0].to
							: '/error'
					"
					variant="accent"
					>{{
						segmentsContent[0].segment.buttons
							? segmentsContent[0].segment.buttons[0].label
							: 'error'
					}}</Button
				>
			</div>
			<div class="col-span-full md:col-span-6 h-[50vh] lg:h-[60vh]">
				<TextBlock
					class="lg:mt-44"
					:content="segmentsContent[0].contents.hero"
				/>
			</div>
		</ScrollSegment>
		<ScrollSegment :pageSegment="segmentsContent[1].segment">
			<Rotor
				ref="projectRotor"
				:completionCallback="cbRotorComplete"
				:slides="projectsContent"
			/>
		</ScrollSegment>
	</ScrollStop>
	<ScrollStop>
		<ScrollSegment :pageSegment="segmentsContent[2].segment">
			<div class="mt-80 col-span-full" />
			<TextBlock
				:content="segmentsContent[2].contents.closer"
				class="lg:mt-44 col-span-full lg:col-span-8"
			>
				<Button
					v-for="link in segmentsContent[2].contents.social"
					class="aspect-square"
					:to="link.to"
					variant="dark"
				>
					<component
						:is="link.icon"
						class="text-mono-500 group-hover:text-mono-50"
					/>
				</Button>
			</TextBlock>
			<div class="mt-44 col-span-full" />
			<div
				id="legal"
				class="col-span-full w-screen justify-self-center bg-mono-900"
			>
				<Grid class="">
					<a
						class="text-mono-500 hover:text-mono-300 active:text-mono-50"
						href="/legal/imprint"
						>imprint</a
					>
					<a
						class="text-mono-500 hover:text-mono-300 active:text-mono-50"
						href="/legal/privacy"
						>privacy</a
					>
					<div class="h-44 md:h-56 lg:h-0"></div>
				</Grid>
			</div>
		</ScrollSegment>
	</ScrollStop>
</template>

<script setup lang="ts">
// props
let cbRotorComplete: () => void
let exitScrollStops: () => void

const projectRotor = ref()
const { updateActivePage } = useGlobalStore()

const segmentsContent = await queryContent<contentSegment>('landing').find()
const projectsContent = await queryContent<contentProject>('projects').find()
console.log(segmentsContent)

onMounted(() => {
	// set page title
	updateActivePage({
		page: 'what philip',
	})

	// segments
	useScrollSegments()

	// enter scroll stops
	const {
		enter: enterScrollstops,
		next,
		exit,
		scrollingBlocked,
	} = useScrollStops()
	enterScrollstops()

	cbRotorComplete = next
	exitScrollStops = exit

	watch(scrollingBlocked, (value) => {
		if (value) {
			setTimeout(() => {
				projectRotor.value?.enter()
			}, 400)
		}
	})
})
onUnmounted(() => {
	exitScrollStops()
})
</script>

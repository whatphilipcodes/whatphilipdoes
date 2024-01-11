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
							: 'error'
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
				<BlockTextCTA
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
			<div
				class="flex h-[50vh] lg:h-[60vh] col-span-full items-end lg:items-center mb-4"
			>
				<BlockTextCTA
					:content="segmentsContent[2].contents.closer"
					class="lg:col-span-8"
				>
					<Button
						class="w-44 h-10 max-sm:hidden"
						variant="dark"
						:to="segmentsContent[2].contents.download.to"
						:download="segmentsContent[2].contents.download.download"
						>{{ segmentsContent[2].contents.download.label }}</Button
					>
					<Button
						v-for="link in segmentsContent[2].contents.social"
						class="aspect-square lg:w-10"
						:to="link.to"
						variant="dark"
					>
						<component
							:is="link.icon"
							class="text-mono-500 group-hover:text-mono-50"
						/>
					</Button>
				</BlockTextCTA>
			</div>
			<Footer />
		</ScrollSegment>
	</ScrollStop>
</template>

<script setup lang="ts">
// props
let cbRotorComplete: () => void
let exitScrollStops: () => void

const projectRotor = ref()
const { updateActivePage } = useGlobalStore()

const { enterScrollSegments, exitScrollSegments } = useScrollSegments()

const segmentsContent = await queryContent<contentSegment>('landing').find()
const projectsContent = await queryContent<contentProject>('projects').find()

onMounted(() => {
	// set page title
	updateActivePage('what philip')

	// segments
	enterScrollSegments()

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
	exitScrollSegments()
})
</script>

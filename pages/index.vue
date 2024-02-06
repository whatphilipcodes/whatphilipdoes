<template>
	<ScrollStop>
		<ScrollSegment :pageSegment="segmentsContent[0].segment">
			<div
				class="z-front col-start-12 h-10 w-44 justify-self-end max-lg:hidden"
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
			<div class="col-span-full h-[56vh] md:col-span-6 lg:h-[64vh]">
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
				class="col-span-full mb-4 flex h-[56vh] items-end md:mb-8 lg:h-[64vh] lg:items-center"
			>
				<BlockTextCTA
					:content="segmentsContent[2].contents.closer"
					class="lg:col-span-8"
				>
					<Button
						class="hidden h-10 w-44 lg:block"
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
						<component :is="link.icon" />
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

useScrollSegments()

const segmentsContent = await queryContent<contentSegment>('landing').find()
const projectsContent = await queryContent<contentProject>('projects').find()

const dbWheelTrigger = useDebounceFn(() => {
	projectRotor.value?.enter()
	window.removeEventListener('wheel', dbWheelTrigger)
}, 400)

function touchTrigger() {
	projectRotor.value?.enter()
	window.removeEventListener('touchstart', touchTrigger)
}

onMounted(() => {
	// set page title
	updateActivePage('what philip')

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
			projectRotor.value?.showUI()
			window.addEventListener('wheel', dbWheelTrigger)
			window.addEventListener('touchstart', touchTrigger)
		}
	})
})
onUnmounted(() => {
	exitScrollStops()
})
</script>

<template>
	<LayoutColumns class="pt-4 md:pt-6 lg:pt-8">
		<ScrollStop>
			<ScrollSegment :pageSegment="content.segments[0]">
				<div
					class="z-[200] col-start-12 h-10 w-44 justify-self-end max-lg:hidden"
				>
					<Button
						class="w-full"
						:to="content.segments[0].buttons?.[0].to || '/404'"
						variant="accent"
						>{{ content.segments[0].buttons?.[0].label || 'error' }}</Button
					>
				</div>
				<div class="col-span-full h-[56vh] md:col-span-6 lg:h-[64vh]">
					<BlockTextCTA class="lg:mt-44" :content="content.bundle.hero" />
				</div>
			</ScrollSegment>
			<ScrollSegment :pageSegment="content.segments[1]">
				<Rotor
					ref="projectRotor"
					:completionCallback="cbRotorComplete"
					:slides="projectsContent"
				/>
			</ScrollSegment>
		</ScrollStop>
		<ScrollStop>
			<ScrollSegment :pageSegment="content.segments[2]">
				<div
					class="col-span-full mb-4 flex h-[56vh] items-end md:mb-8 lg:h-[64vh] lg:items-center"
				>
					<BlockTextCTA
						:content="content.bundle.closer.cta"
						class="lg:col-span-8"
					>
						<Button
							v-for="link in content.bundle.closer.social"
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
	</LayoutColumns>
</template>

<script setup lang="ts">
// props
let cbRotorComplete: () => void
let exitScrollStops: () => void

const projectRotor = ref()
const { updateActivePage } = useGlobalStore()

useScrollSegments()

// content
const { data } = await useAsyncData(() =>
	queryContent<contentPassive>(useRoute().fullPath).findOne(),
)
const content = computed(() => data?.value as contentPassive)
useContentHead(content)

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

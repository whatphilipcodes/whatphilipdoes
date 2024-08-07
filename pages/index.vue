<template>
	<TransitionWrapper>
		<LayoutColumns>
			<ScrollStop>
				<ScrollSegment :pageSegment="content.segments[0]">
					<div class="z-[200] col-span-full mt-8 hidden justify-end lg:flex">
						<div
							ref="contactBtn"
							class="h-10 w-44 opacity-0 transition-opacity duration-300"
						>
							<Button
								class="w-full"
								:to="content.segments[0].buttons?.[0].to || '/404'"
								variant="accent"
								>{{ content.segments[0].buttons?.[0].label || 'error' }}</Button
							>
						</div>
					</div>

					<div
						class="col-span-full flex h-[64lvh] flex-col pb-12 md:col-span-6"
					>
						<div datainfo="spacer-title" class="col-span-full h-40" />
						<div
							datainfo="spacer-lg"
							class="col-span-full hidden h-24 md:block lg:h-32"
						/>
						<BlockTextCTA :content="content.bundle.hero" />
					</div>
				</ScrollSegment>
				<ScrollSegment :pageSegment="content.segments[1]">
					<Rotor
						ref="projectRotor"
						:slides="projectsContent"
						:exitCallback="cbRotorComplete"
					/>
				</ScrollSegment>
			</ScrollStop>
			<ScrollStop>
				<ScrollSegment :pageSegment="content.segments[2]">
					<div
						data-info="cta-wrapper"
						class="col-span-full flex h-[40lvh] items-end pt-12 lg:items-center"
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
					<PageFooter />
				</ScrollSegment>
			</ScrollStop>
		</LayoutColumns>
	</TransitionWrapper>
</template>

<script setup lang="ts">
// props
const contactBtn = ref<HTMLElement>()

const projectRotor = ref()
const store = useGlobalStore()
const device = useDeviceType()

useScrollSegments()
const {
	enter: enterScrollStops,
	next,
	exit: exitScrollStops,
	scrollingBlocked,
} = useScrollStops()

// on rotor complete
function cbRotorComplete() {
	next()
	if (device.value === 'touch')
		window.scrollTo({
			top: window.scrollY + window.innerHeight,
			behavior: 'smooth',
		})
}
watch(scrollingBlocked, (value) => {
	if (value) {
		projectRotor.value?.enter()
	}
})

// content
const { data } = await useAsyncData(() =>
	queryContent<contentPassive>(useRoute().fullPath).findOne(),
)
const content = computed(() => data?.value as contentPassive)
useContentHead(content)

const projectsContent = await queryContent<contentProject>('projects').find()

onMounted(() => {
	window.scrollTo(0, 0)
	store.updateActivePage('what philip')

	enterScrollStops()

	// wait for contactBtn to have a value
	watchOnce(contactBtn, (value) => {
		setTimeout(() => {
			if (value) value.classList.remove('opacity-0')
		}, 300)
	})
})
onUnmounted(() => {
	exitScrollStops()
})
</script>

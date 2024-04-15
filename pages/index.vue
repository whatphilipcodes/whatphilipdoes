<template>
	<TransitionWrapper>
		<LayoutColumns>
			<ScrollStop>
				<ScrollSegment :pageSegment="content.segments[0]">
					<div
						class="z-[200] col-span-2 col-start-[-3] mt-8 hidden justify-end lg:flex"
					>
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
						class="col-span-full flex flex-col pb-12 md:col-span-6"
						:style="{
							minHeight: `${store.lvh * 0.64}px`,
						}"
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
						class="col-span-full flex items-end pt-12 lg:items-center"
						:style="{
							minHeight: `${store.lvh * 0.4}px`,
						}"
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
let cbRotorComplete: () => void
let exitScrollStops: () => void

const contactBtn = ref<HTMLElement>()

const projectRotor = ref()
const store = useGlobalStore()
const device = useDeviceType()

useScrollSegments()

// content
const { data } = await useAsyncData(() =>
	queryContent<contentPassive>(useRoute().fullPath).findOne(),
)
const content = computed(() => data?.value as contentPassive)
useContentHead(content)

const projectsContent = await queryContent<contentProject>('projects').find()

onMounted(() => {
	// set scroll to top
	window.scrollTo(0, 0)

	// set page title
	store.updateActivePage('what philip')

	// enter scroll stops
	const {
		enter: enterScrollstops,
		next,
		exit,
		scrollingBlocked,
	} = useScrollStops()
	enterScrollstops()

	cbRotorComplete = () => {
		next()
		if (device.value === 'touch')
			window.scrollTo({
				top: window.scrollY + store.lvh,
				behavior: 'smooth',
			})
	}
	exitScrollStops = exit

	watch(scrollingBlocked, (value) => {
		if (value) {
			projectRotor.value?.enter()
		}
	})

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

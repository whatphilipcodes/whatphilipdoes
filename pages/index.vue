<template>
	<TransitionWrapper>
		<ScrollPromptAuto />
		<LayoutColumns class="pt-4 md:pt-6 lg:pt-8">
			<ScrollStop>
				<ScrollSegment :pageSegment="content.segments[0]">
					<div
						ref="contactBtn"
						class="z-[200] col-start-12 h-10 w-44 justify-self-end opacity-0 transition-opacity duration-300 max-lg:hidden"
					>
						<Button
							class="w-full"
							:to="content.segments[0].buttons?.[0].to || '/404'"
							variant="accent"
							>{{ content.segments[0].buttons?.[0].label || 'error' }}</Button
						>
					</div>
					<div datainfo="spacer-title" class="col-span-full h-36" />
					<div
						class="col-span-full md:col-span-6"
						:style="{ height: `${store.lvh * 0.56}px` }"
					>
						<BlockTextCTA class="lg:mt-44" :content="content.bundle.hero" />
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
						class="col-span-full mb-4 flex items-end md:mb-8 lg:items-center"
						:style="{ height: `${store.lvh * 0.4}px` }"
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
	</TransitionWrapper>
</template>

<script setup lang="ts">
// props
let cbRotorComplete: () => void
let exitScrollStops: () => void

const contactBtn = ref<HTMLElement>()

const projectRotor = ref()
const store = useGlobalStore()

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
		window.scrollTo({
			top: window.scrollY + store.lvh,
			behavior: 'smooth',
		})
		window.scrollBy
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

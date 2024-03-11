export default defineNuxtRouteMiddleware(async (to) => {
	const store = useGlobalStore()
	store.setTransitioning(true)
	try {
		const content = await queryContent(to.path).findOne() // useRoute warning caused by nuxt content
		store.updateActivePage(content.segments[0].page)
		store.updateActiveSegment({
			name: content.segments[0].name,
			buttons: content.segments[0].buttons ?? [],
		})
	} catch (error) {
		console.error(
			`The content page for the route ${to.fullPath} is missing. Please check the content directory.`,
			error,
		)
		return
	}
})

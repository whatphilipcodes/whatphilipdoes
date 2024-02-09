export default defineNuxtRouteMiddleware(async (to) => {
	const { updateActivePage, updateActiveSegment } = useGlobalStore()
	const content = await queryContent(to.path).findOne() // useRoute warning caused by nuxt content
	if (!content) return
	updateActivePage(content.segments[0].page)
	updateActiveSegment({
		name: content.segments[0].name,
		buttons: content.segments[0].buttons ?? [],
	})
})

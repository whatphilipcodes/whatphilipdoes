export default defineNuxtRouteMiddleware(async (to) => {
	const { updateActivePage, updateActiveSegment } = useGlobalStore()
	const segment = await queryContent<pageSegment>(to.path).findOne() // #todo: prevent the useRoute() call nuxt-content uses internally
	if (!segment) return
	updateActivePage(segment.page)
	updateActiveSegment({
		name: segment.name,
		buttons: segment.buttons ?? [],
	})
})

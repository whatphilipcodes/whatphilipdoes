export default defineNuxtRouteMiddleware(async (to) => {
	const { updateActivePage, updateActiveSegment } = useGlobalStore()
	const data = await queryContent(to.path).findOne() // #todo: prevent the useRoute() call nuxt-content uses internally
	if (!data) return
	updateActivePage(data.nav.page)
	updateActiveSegment({
		title: data.nav.segment,
		buttons: data.nav.buttons ?? [],
	})
})

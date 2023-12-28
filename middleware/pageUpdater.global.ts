export default defineNuxtRouteMiddleware(async (to) => {
	const { updateActivePage, updateActiveSegment } = useGlobalStore()
	const { data } = await useAsyncData(() => queryContent(to.path).findOne())
	updateActivePage({ page: data.value?.meta.page })
	updateActiveSegment({ title: data.value?.meta.segment })
})

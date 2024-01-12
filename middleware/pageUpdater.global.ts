export default defineNuxtRouteMiddleware(async (to) => {
	// const { updateActivePage, updateActiveSegment } = useGlobalStore()
	// const { data } = await useAsyncData(() => queryContent(to.path).findOne()) // #todo: prevent the useRoute() call nuxt-content uses internally
	// if (!data.value) return
	// updateActivePage(data.value?.meta.page)
	// updateActiveSegment({
	// 	title: data.value?.meta.segment,
	// 	buttons: data.value?.meta.buttons ?? [],
	// })
	console.log('pageUpdater.global.ts')
})

export default defineNuxtRouteMiddleware(async (from) => {
	// conflict with nuxt-content api, when rendering static site.
	if (Object.keys(from.query).length > 0) {
		return navigateTo('/')
	}
})

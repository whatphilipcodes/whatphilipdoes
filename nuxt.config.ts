// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	typescript: {
		strict: true,
		typeCheck: true,
	},
	modules: ['@nuxtjs/tailwindcss', '@nuxt/image'],
	devtools: {
		enabled: true,
	},
})

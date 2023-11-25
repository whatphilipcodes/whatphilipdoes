// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	alias: {
		assets: '/<root-dir>/assets',
	},
	app: {
		head: {
			meta: [
				{
					// to change safari interface to mono-950
					hid: 'theme-color',
					name: 'theme-color',
					content: '#0d0d0d',
				},
			],
			bodyAttrs: {
				// global background color (issue see app.vue)
				class: 'bg-mono-950',
			},
		},
	},
	typescript: {
		strict: true,
		typeCheck: true,
	},
	modules: ['@nuxtjs/tailwindcss', '@nuxt/image'],
	devtools: {
		enabled: true,
	},
})

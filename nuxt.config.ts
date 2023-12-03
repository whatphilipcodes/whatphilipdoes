// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: [
		'@nuxtjs/tailwindcss',
		'@nuxt/image',
		'@nuxtjs/google-fonts',
		'@vueuse/nuxt',
	],
	googleFonts: {
		families: {
			preload: true,
			Jost: {
				wght: [400, 600],
				ital: [500],
			},
		},
	},
	alias: {
		assets: '/<root-dir>/assets',
	},
	app: {
		rootId: 'whatphilipdoes',
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
	devtools: {
		enabled: true,
	},
	devServer: {
		host: '0',
	},
})

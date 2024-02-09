// nut content fix -> https://github.com/nuxt/content/issues/1551#issuecomment-1470246543
import { globSync } from 'glob'
const contentRoutes = globSync('./content/**/*.md', {
	ignore: 'content/index.md',
}).map((path) => path.slice(7, -3))

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	// ssr: false,
	nitro: {
		preset: 'static',
		prerender: {
			routes: [...contentRoutes],
		},
	},
	modules: [
		'@pinia/nuxt',
		'@nuxt/content',
		'@nuxtjs/tailwindcss',
		'@nuxtjs/google-fonts',
		'nuxt-svgo',
		'@vueuse/nuxt',
		'@nuxt/image',
	],
	image: {
		dir: 'assets/img',
	},
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
		// assets: '/<root-dir>/assets', // #info: breaks svgo
		pinia: '/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs', // fix pinia installation issue
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
			link: [
				{
					rel: 'icon',
					href: '/favicon.ico',
					sizes: '48x48',
				},
				{
					rel: 'icon',
					href: '/favicon.svg',
					sizes: 'any',
					type: 'image/svg+xml',
				},
				{
					rel: 'mask-icon',
					href: '/mask-icon.svg',
					color: '#000000',
				},
				{
					rel: 'apple-touch-icon',
					href: '/apple-touch-icon.png',
				},
				{
					rel: 'manifest',
					href: '/site.webmanifest',
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

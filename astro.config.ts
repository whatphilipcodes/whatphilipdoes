// @ts-check

import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, envField } from 'astro/config';
import { loadEnv } from 'vite';

const { SITE } = loadEnv(
	process.env.NODE_ENV ?? 'NODE_ENV is set by Astro',
	process.cwd(),
	'',
);

// https://astro.build/config
export default defineConfig({
	site: SITE,
	vite: { plugins: [tailwindcss()] },
	integrations: [
		react(),
		mdx(),
		sitemap({
			filter: (page) => !page.startsWith(`${SITE}/legal/`),
		}),
	],
	env: {
		schema: {
			SITE: envField.string({ context: 'server', access: 'secret' }),
			FIRSTNAME: envField.string({ context: 'server', access: 'secret' }),
			LASTNAME: envField.string({ context: 'server', access: 'secret' }),
			STREET: envField.string({ context: 'server', access: 'secret' }),
			NUMBER: envField.string({ context: 'server', access: 'secret' }),
			ZIP: envField.string({ context: 'server', access: 'secret' }),
			CITY: envField.string({ context: 'server', access: 'secret' }),
			MAIL: envField.string({ context: 'server', access: 'secret' }),
			PHONE: envField.string({ context: 'server', access: 'secret' }),
		},
	},
});

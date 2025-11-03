// @ts-check

import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, envField } from 'astro/config';
import { loadEnv } from 'vite';

const { CONTACT_SITE } = loadEnv(
	process.env.NODE_ENV ?? 'NODE_ENV is set by Astro',
	process.cwd(),
	'',
);

// https://astro.build/config
export default defineConfig({
	site: CONTACT_SITE,
	// @ts-expect-error - Vite 7 type incompatibility with Tailwind CSS plugin
	vite: { plugins: [tailwindcss()] },
	integrations: [
		react(),
		mdx(),
		sitemap({
			filter: (page) => !page.startsWith(`${CONTACT_SITE}/legal/`),
		}),
	],
	env: {
		schema: {
			SERVER_USER: envField.string({ context: 'server', access: 'secret' }),
			SERVER_HOST: envField.string({ context: 'server', access: 'secret' }),
			SERVER_PATH_TEST: envField.string({
				context: 'server',
				access: 'secret',
			}),
			SERVER_PATH_LIVE: envField.string({
				context: 'server',
				access: 'secret',
			}),
			CONTACT_FIRSTNAME: envField.string({
				context: 'server',
				access: 'secret',
			}),
			CONTACT_LASTNAME: envField.string({
				context: 'server',
				access: 'secret',
			}),
			CONTACT_STREET: envField.string({ context: 'server', access: 'secret' }),
			CONTACT_NUMBER: envField.string({ context: 'server', access: 'secret' }),
			CONTACT_ZIP: envField.string({ context: 'server', access: 'secret' }),
			CONTACT_CITY: envField.string({ context: 'server', access: 'secret' }),
			CONTACT_PHONE: envField.string({ context: 'server', access: 'secret' }),
			CONTACT_MAIL: envField.string({ context: 'server', access: 'secret' }),
			CONTACT_SITE: envField.string({ context: 'server', access: 'secret' }),
		},
	},
});

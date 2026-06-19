import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const headSchema = z.object({
	draft: z.boolean().optional(),
	title: z.string(),
	description: z.string(),
	previewImage: z.string().optional(),
});

export type HeadProps = z.infer<typeof headSchema>;

const projectSchema = headSchema.extend({
	previewImage: z.string(),
	tags: z.array(z.string()),
	start: z.coerce.date(),
	end: z.coerce.date().optional(),
});

const basePattern = '**/[^_]*.{md,mdx}';

// --- Collections --- //

const nav = defineCollection({
	loader: glob({ base: 'content/nav', pattern: basePattern }),
	schema: headSchema,
});

const built = defineCollection({
	loader: glob({ base: 'content/built', pattern: basePattern }),
	schema: projectSchema,
});

const legal = defineCollection({
	loader: glob({ base: 'content/legal', pattern: basePattern }),
	schema: headSchema,
});

export const collections = { nav, built, legal };

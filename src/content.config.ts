import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const baseSchema = z.object({
	draft: z.boolean().optional(),
	title: z.string(),
	description: z.string(),
	previewImage: z.string().optional(),
});

type HeadProps = z.infer<typeof baseSchema>;

const projectSchema = baseSchema.extend({
	tags: z.array(z.string()),
});

const basePattern = '**/[^_]*.{md,mdx}';

// --- Collections --- //

const nav = defineCollection({
	loader: glob({ base: 'content/nav', pattern: basePattern }),
	schema: baseSchema,
});

const built = defineCollection({
	loader: glob({ base: 'content/built', pattern: basePattern }),
	schema: projectSchema,
});

const legal = defineCollection({
	loader: glob({ base: 'content/legal', pattern: basePattern }),
	schema: baseSchema,
});

export const collections = { nav, built, legal };
export type { HeadProps };

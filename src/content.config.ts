import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const baseSchema = z.object({
	title: z.string(),
	description: z.string(),
	draft: z.boolean(),
});

const basePattern = '**/*.{md,mdx}';

// --- Collections --- //

const legal = defineCollection({
	loader: glob({ base: 'src/content/legal', pattern: basePattern }),
	schema: baseSchema,
});

export const collections = { legal };

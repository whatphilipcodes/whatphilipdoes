import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const baseSchema = z.object({
	draft: z.boolean(),
	title: z.string(),
	description: z.string(),
});

const projectSchema = baseSchema.extend({
	tags: z.array(z.string()),
});

const basePattern = '**/[^_]*.{md,mdx}';

// --- Collections --- //

const legal = defineCollection({
	loader: glob({ base: 'content/legal', pattern: basePattern }),
	schema: baseSchema,
});

const projects = defineCollection({
	loader: glob({ base: 'content/projects', pattern: basePattern }),
	schema: projectSchema,
});

export const collections = { legal, projects };

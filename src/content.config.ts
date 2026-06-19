import { defineCollection, type SchemaContext } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// 1. Schema Factories
const headSchema = (context: SchemaContext) =>
	z.object({
		draft: z.boolean().optional(),
		title: z.string(),
		description: z.string(),
		previewImage: context.image().optional(),
	});

export type HeadProps = z.infer<ReturnType<typeof headSchema>>;

const projectSchema = (context: SchemaContext) =>
	headSchema(context).extend({
		previewImage: context.image(),
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

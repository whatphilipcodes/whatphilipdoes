import { type CollectionEntry, getCollection } from 'astro:content';

export function getBuilt(): Promise<CollectionEntry<'built'>[]> {
	return getCollection('built', ({ data }) => {
		return import.meta.env.PROD ? data.draft !== true : true;
	});
}

export function getLegal(): Promise<CollectionEntry<'legal'>[]> {
	return getCollection('legal', ({ data }) => {
		return import.meta.env.PROD ? data.draft !== true : true;
	});
}

export async function getTags(): Promise<
	Map<string, CollectionEntry<'built'>[]>
> {
	const items = await getBuilt();

	return items.reduce((acc, val) => {
		for (const tag of val.data.tags) {
			const current = acc.get(tag);
			current ? current.push(val) : acc.set(tag, [val]);
		}
		return acc;
	}, new Map<string, CollectionEntry<'built'>[]>());
}

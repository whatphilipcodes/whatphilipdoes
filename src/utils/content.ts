import { type CollectionEntry, getCollection } from 'astro:content';

export const getBuilt = async () => {
	return await getCollection('built', ({ data }) => {
		return import.meta.env.PROD ? data.draft !== true : true;
	});
};

export const getLegal = async () => {
	return await getCollection('legal', ({ data }) => {
		return import.meta.env.PROD ? data.draft !== true : true;
	});
};

export const getTags = async () => {
	const items = await getBuilt();
	return items.reduce((acc, val) => {
		for (const tag of val.data.tags) {
			const current = acc.get(tag);
			current ? current.push(val) : acc.set(tag, [val]);
		}
		return acc;
	}, new Map<string, CollectionEntry<'built'>[]>());
};

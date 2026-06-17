import type { CollectionEntry } from 'astro:content';
import Tag from '@react/TagSelector/Tag';

interface BuiltListProps {
	built: CollectionEntry<'built'>[];
}

export default function BuiltList({ built }: BuiltListProps) {
	return (
		<div className='mt-2 flex flex-col gap-2'>
			{built.map((item) => (
				<a
					key={item.id}
					href={`/built/${item.id}/`}
					className='relative rounded-md px-4 py-2 ring ring-mono-300 dark:ring-mono-800'
				>
					<div className='flex w-full flex-row flex-wrap gap-x-4 gap-y-2'>
						<div className='text-ellipsis'>{item.data.title}</div>
						<div className='flex w-full flex-row gap-x-2 md:w-fit'>
							{item.data.tags?.map((tag) => (
								<Tag
									key={tag}
									tag={tag}
									href={`/built/tags${tag}`}
									disabled={true}
								/>
							))}
						</div>
					</div>
				</a>
			))}
		</div>
	);
}

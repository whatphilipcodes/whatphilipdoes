import type { CollectionEntry } from 'astro:content';

interface BuiltListProps {
	built: CollectionEntry<'built'>[];
}

const BuiltList = ({ built }: BuiltListProps) => {
	return (
		<>
			{built.map((item) => (
				<a
					key={item.id}
					href={`/built/${item.id}/`}
					className='relative rounded-md ring ring-mono-300 dark:ring-mono-800'
				>
					<div className='flex w-full flex-row flex-wrap gap-x-4 gap-y-2'>
						<div className='text-ellipsis'>{item.data.title}</div>
						<div className='flex w-full flex-row gap-x-2 md:w-fit'>
							{item.data.tags?.map((tag) => (
								<p key={tag}>{tag}</p>
							))}
						</div>
					</div>
				</a>
			))}
		</>
	);
};

export default BuiltList;

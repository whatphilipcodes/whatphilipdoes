import Tag from './Tag';

interface TagSelectorProps {
	active: string;
	all: string[];
}

const TagSelector = ({ active, all }: TagSelectorProps) => {
	return (
		<div className='flex flex-row gap-2'>
			<Tag active={active === 'all'} tag='all' href='/built/' />
			{all.map((tag) => {
				return (
					<Tag
						key={tag}
						tag={tag}
						href={`/built/tags/${tag}`}
						active={active === tag}
					/>
				);
			})}
		</div>
	);
};

export default TagSelector;

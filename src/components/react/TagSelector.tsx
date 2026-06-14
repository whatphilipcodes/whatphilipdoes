interface TagSelectorProps {
	activeTag: string;
	allTags: string[];
}

const TagSelector = ({ activeTag, allTags }: TagSelectorProps) => {
	return (
		<>
			{allTags.map((tag) => {
				return (
					<a
						key={tag}
						className={activeTag === tag ? 'text-mono-500' : ''}
						href={tag}
					>
						{tag}
					</a>
				);
			})}
		</>
	);
};

export default TagSelector;

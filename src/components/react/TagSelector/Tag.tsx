interface TagProps {
	tag: string;
	href: string;
	active?: boolean;
	disabled?: boolean;
}

const Tag = ({ tag, href, active, disabled }: TagProps) => {
	return (
		<a
			className={`rounded-md px-3 ring ${active ? 'text-mono-500 ring-mono-200' : 'ring-mono-800'} ${disabled && 'pointer-events-none'}`}
			href={href}
		>
			{tag}
		</a>
	);
};

export default Tag;

interface TagProps {
	tag: string;
	href: string;
	active?: boolean;
	disabled?: boolean;
}

export default function Tag({ tag, href, active, disabled }: TagProps) {
	return disabled ? (
		<div
			className={`rounded-md px-3 ring ${active ? 'ring-mono-200' : 'text-mono-500 ring-mono-800'}`}
		>
			{tag}
		</div>
	) : (
		<a
			className={`rounded-md px-3 ring ${active ? 'ring-mono-200' : 'text-mono-500 ring-mono-800'}`}
			href={href}
		>
			{tag}
		</a>
	);
}

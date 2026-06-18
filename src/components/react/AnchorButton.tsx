interface AnchorButtonProps {
	text: string;
	href: string;
}

export default function AchorButton({ text, href }: AnchorButtonProps) {
	return (
		<a
			href={href}
			className='group flex h-full w-max items-center pr-2 pl-px focus:outline-none'
		>
			<div className='group-focus-visible:accessible block w-max whitespace-nowrap rounded-4xl px-4 py-2 text-center text-mono-950 ring ring-mono-950 transition-color duration-300 hover:bg-mono-950 hover:text-mono-50 hover:ring-transparent dark:text-mono-50 dark:ring-mono-100 dark:hover:bg-mono-50 dark:hover:text-mono-950'>
				{text}
			</div>
		</a>
	);
}

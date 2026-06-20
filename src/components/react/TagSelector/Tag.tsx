import { cva } from '@/utils/cva.config';

interface TagProps {
	tag: string;
	href: string;
	active?: boolean;
	disabled?: boolean;
}

export default function Tag({ tag, href, active, disabled }: TagProps) {
	const style = cva({
		base: 'rounded-md px-3 ring',
		variants: {
			active: {
				false: 'text-mono-500 ring-mono-200 dark:ring-mono-800',
				true: 'ring-mono-950 dark:ring-mono-50',
			},
		},
	});

	return disabled ? (
		<div className={style({ active: false })}>{tag}</div>
	) : (
		<a className={style({ active })} href={href}>
			{tag}
		</a>
	);
}

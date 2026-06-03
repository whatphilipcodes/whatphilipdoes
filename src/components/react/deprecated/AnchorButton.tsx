import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
	children?: ReactNode;
};

const AnchorButton = ({ children, className, ...props }: Props) => {
	return (
		<a
			{...props}
			className={twMerge(
				'flex cursor-pointer flex-row rounded-lg border border-mono-900 bg-mono-950/75 px-5 py-2 text-mono-800 transition-colors hover:text-mono-600',
				className,
			)}
		>
			{children}
		</a>
	);
};

export default AnchorButton;

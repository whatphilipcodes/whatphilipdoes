import { useEffect, useRef } from 'react';
import { currentActionStore } from '@/store/menuStore.ts';

export type ActionAnchorProps = {
	action: string;
	href: string;
};

const ActionAnchor = ({ action, href }: ActionAnchorProps) => {
	const target = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!target.current) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					currentActionStore.set({ action, href });
				}
			},
			{
				threshold: 0,
			},
		);

		observer.observe(target.current);

		return () => {
			observer.disconnect();
		};
	}, [action, href]);

	return <div ref={target} className='h-0 w-full' aria-hidden='true' />;
};

export default ActionAnchor;

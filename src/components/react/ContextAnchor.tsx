import { useEffect, useRef } from 'react';

export type ContextAnchorProps = {
	action: string;
	href: string;
};

const ContextAnchor = ({ action, href }: ContextAnchorProps) => {
	const target = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!target.current) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					const event = new CustomEvent('onContextAnchor', {
						detail: { action, href },
					});
					window.dispatchEvent(event);
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

export default ContextAnchor;

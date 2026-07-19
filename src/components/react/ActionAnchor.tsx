import { useEffect, useRef } from 'react';
import { $currentActionStore } from '@/store/menuStore.ts';

export interface ActionAnchorProps {
	action: string;
	href: string;
}

export default function ActionAnchor(props: ActionAnchorProps) {
	const target = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!target.current) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					const currentStoreValue = $currentActionStore.get();
					if (
						!currentStoreValue ||
						currentStoreValue.action !== props.action ||
						currentStoreValue.href !== props.href
					) {
						$currentActionStore.set(props);
					}
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
	}, [props]);

	return <div ref={target} className='h-0 w-full' aria-hidden='true' />;
}

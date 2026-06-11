import { useEffect, useRef } from 'react';
import { currentActionStore } from '@/store/menuStore.ts';

export type ActionAnchorProps = {
	action: string;
	href: string;
};

const ActionAnchor = (props: ActionAnchorProps) => {
	const target = useRef<HTMLDivElement>(null);
	const propsString = JSON.stringify(props);

	useEffect(() => {
		if (!target.current) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					const currentStoreValue = currentActionStore.get();
					if (JSON.stringify(currentStoreValue) !== propsString) {
						currentActionStore.set(props);
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
	}, [props, propsString]);

	return <div ref={target} className='h-0 w-full' aria-hidden='true' />;
};

export default ActionAnchor;

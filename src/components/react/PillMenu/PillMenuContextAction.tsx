import type { ContextAnchorProps } from '@react/ContextAnchor';
import { useScroll } from '@react/hooks/useScroll';
import { useEffect, useRef, useState } from 'react';

const PillMenuContextAction = () => {
	const { yDir, yArrived, isScrolling } = useScroll(window);
	const [actionVisible, setActionVisible] = useState(true);
	const [currentAction, setCurrentAction] = useState<ContextAnchorProps | null>(
		null,
	);
	const isLocked = useRef(false);
	const isScrollingRef = useRef(isScrolling);

	useEffect(() => {
		isScrollingRef.current = isScrolling;
	}, [isScrolling]);

	useEffect(() => {
		const handleAnchorTrigger = (event: Event) => {
			const customEvent = event as CustomEvent<ContextAnchorProps>;
			setCurrentAction(customEvent.detail);
			setActionVisible(true);
			if (isScrollingRef.current) isLocked.current = true;
		};
		window.addEventListener('onContextAnchor', handleAnchorTrigger);
		return () => {
			window.removeEventListener('onContextAnchor', handleAnchorTrigger);
		};
	}, []);

	useEffect(() => {
		if (!isScrolling) {
			isLocked.current = false;
			return;
		}
		if (isLocked.current || yArrived.bottom || yArrived.top) return;
		if (yDir.down) {
			setActionVisible(false);
		} else if (yDir.up) {
			setActionVisible(true);
		}
	}, [isScrolling, yArrived.bottom, yArrived.top, yDir.down, yDir.up]);

	return (
		actionVisible &&
		currentAction && (
			<a
				href={currentAction.href}
				className='flex h-full shrink-0 items-center pr-2'
			>
				<div className='rounded-full border border-mono-200 px-2 py-1 text-center text-mono-200'>
					{currentAction.action}
				</div>
			</a>
		)
	);
};

export default PillMenuContextAction;

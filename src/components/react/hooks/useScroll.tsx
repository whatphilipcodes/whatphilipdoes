import { useEffect, useRef, useState } from 'react';

export interface UseScrollReturn {
	x: number;
	y: number;
	isScrolling: boolean;
	xArrived: {
		left: boolean;
		right: boolean;
	};
	yArrived: {
		top: boolean;
		bottom: boolean;
	};
	xDir: {
		left: boolean;
		right: boolean;
	};
	yDir: {
		up: boolean;
		down: boolean;
	};
}

export interface UseScrollOptions {
	tolerance?: number;
}

const initialState: UseScrollReturn = {
	x: 0,
	y: 0,
	isScrolling: false,
	xArrived: { left: false, right: false },
	yArrived: { top: false, bottom: false },
	xDir: { left: false, right: false },
	yDir: { up: false, down: false },
};

export const useScroll = (
	target: HTMLElement | SVGElement | Window | Document,
	options: UseScrollOptions = {},
): UseScrollReturn => {
	const { tolerance = 1 } = options;
	const [scrollState, setScrollState] = useState<UseScrollReturn>(initialState);
	const frameRef = useRef<number | null>(null);
	const prevPos = useRef({ x: 0, y: 0 });

	useEffect(() => {
		if (!target) return;

		const applyState = (
			x: number,
			y: number,
			clientX: number,
			clientY: number,
			scrollWidth: number,
			scrollHeight: number,
			isScrollingState?: boolean,
		) => {
			const dx = x - prevPos.current.x;
			const dy = y - prevPos.current.y;

			prevPos.current = { x, y };

			setScrollState((prev) => {
				const nextXDir = dx === 0 ? prev.xDir : { left: dx < 0, right: dx > 0 };
				const nextYDir = dy === 0 ? prev.yDir : { up: dy < 0, down: dy > 0 };

				return {
					x,
					y,
					isScrolling:
						isScrollingState !== undefined
							? isScrollingState
							: prev.isScrolling,
					xArrived: {
						left: x <= tolerance,
						right: scrollWidth - clientX - x <= tolerance,
					},
					yArrived: {
						top: y <= tolerance,
						bottom: scrollHeight - clientY - y <= tolerance,
					},
					xDir: nextXDir,
					yDir: nextYDir,
				};
			});
		};

		const handleWindowUpdate = (target: Window, isScrollingState?: boolean) => {
			const docEl = target.document.documentElement;
			applyState(
				target.scrollX,
				target.scrollY,
				target.innerWidth,
				target.innerHeight,
				docEl.scrollWidth,
				docEl.scrollHeight,
				isScrollingState,
			);
		};

		const handleElementUpdate = (
			target: HTMLElement,
			isScrollingState?: boolean,
		) => {
			applyState(
				target.scrollLeft,
				target.scrollTop,
				target.clientWidth,
				target.clientHeight,
				target.scrollWidth,
				target.scrollHeight,
				isScrollingState,
			);
		};

		const isWindow = target === window || target === document;
		const activeTarget = isWindow
			? target === document
				? (target as Document).defaultView
				: (target as Window)
			: (target as HTMLElement);

		if (!activeTarget)
			throw new Error('Scroll target resolved to null | undefined.');

		const handleUpdate = (
			isWindow ? handleWindowUpdate : handleElementUpdate
		) as (target: Window | HTMLElement, isScrollingState?: boolean) => void;

		const onScroll = () => {
			if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
			frameRef.current = requestAnimationFrame(() =>
				handleUpdate(activeTarget, true),
			);
		};

		const onScrollEnd = () => {
			if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
			frameRef.current = requestAnimationFrame(() =>
				handleUpdate(activeTarget, false),
			);
		};

		const onResize = () => {
			if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
			frameRef.current = requestAnimationFrame(() =>
				handleUpdate(activeTarget),
			);
		};

		handleUpdate(activeTarget);

		target.addEventListener('scroll', onScroll, { passive: true });
		target.addEventListener('scrollend', onScrollEnd, { passive: true });
		window.addEventListener('resize', onResize, { passive: true });

		return () => {
			target.removeEventListener('scroll', onScroll);
			target.removeEventListener('scrollend', onScrollEnd);
			window.removeEventListener('resize', onResize);
			if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
		};
	}, [target, tolerance]);

	return scrollState;
};

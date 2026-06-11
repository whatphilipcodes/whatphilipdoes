import { useEffect, useRef, useState } from 'react';
import { isEventSupported } from '@/utils/helpers';

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
	debounceDelay?: number;
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
	target: HTMLElement | SVGElement | Window | Document | null,
	options: UseScrollOptions = {},
): UseScrollReturn => {
	const { tolerance = 1, debounceDelay = 150 } = options;
	const [scrollState, setScrollState] = useState<UseScrollReturn>(initialState);
	const frameRef = useRef<number | null>(null);
	const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const prevPos = useRef({ x: 0, y: 0 });

	useEffect(() => {
		if (!target) return;

		const isWindow = target === window || target === document;
		const activeTarget = isWindow
			? target === document
				? (target as Document).defaultView
				: (target as Window)
			: (target as HTMLElement | SVGElement);

		if (!activeTarget) {
			throw new Error('Scroll target resolved to null | undefined.');
		}

		const supportsScrollEnd = isEventSupported('scrollend', activeTarget);

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

		const handleWindowUpdate = (t: Window, isScrollingState?: boolean) => {
			const docEl = t.document.documentElement;
			applyState(
				t.scrollX,
				t.scrollY,
				t.innerWidth,
				t.innerHeight,
				docEl.scrollWidth,
				docEl.scrollHeight,
				isScrollingState,
			);
		};

		const handleElementUpdate = (
			t: HTMLElement | SVGElement,
			isScrollingState?: boolean,
		) => {
			applyState(
				t.scrollLeft,
				t.scrollTop,
				t.clientWidth,
				t.clientHeight,
				t.scrollWidth,
				t.scrollHeight,
				isScrollingState,
			);
		};

		const handleUpdate = (
			isWindow ? handleWindowUpdate : handleElementUpdate
		) as (
			t: Window | HTMLElement | SVGElement,
			isScrollingState?: boolean,
		) => void;

		const onScrollEnd = () => {
			if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
			frameRef.current = requestAnimationFrame(() =>
				handleUpdate(activeTarget, false),
			);
		};

		const onScroll = () => {
			if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
			frameRef.current = requestAnimationFrame(() =>
				handleUpdate(activeTarget, true),
			);

			if (!supportsScrollEnd) {
				if (scrollTimeoutRef.current !== null) {
					clearTimeout(scrollTimeoutRef.current);
				}
				scrollTimeoutRef.current = setTimeout(onScrollEnd, debounceDelay);
			}
		};

		const onResize = () => {
			if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
			frameRef.current = requestAnimationFrame(() =>
				handleUpdate(activeTarget),
			);
		};

		handleUpdate(activeTarget);

		target.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('resize', onResize, { passive: true });

		if (supportsScrollEnd) {
			target.addEventListener('scrollend', onScrollEnd, { passive: true });
		}

		return () => {
			target.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', onResize);

			if (supportsScrollEnd) {
				target.removeEventListener('scrollend', onScrollEnd);
			}
			if (frameRef.current !== null) {
				cancelAnimationFrame(frameRef.current);
			}
			if (scrollTimeoutRef.current !== null) {
				clearTimeout(scrollTimeoutRef.current);
			}
		};
	}, [target, tolerance, debounceDelay]);

	return scrollState;
};

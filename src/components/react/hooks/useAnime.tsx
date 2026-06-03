import { createScope, type Scope } from 'animejs';
import { type RefObject, useEffect, useRef } from 'react';

type AnimeCallback = (self: Scope) => void;

/**
 * Custom hook to manage anime.js scope with proper cleanup for React components.
 *
 * @param rootRef - RefObject pointing to the root element for the animation scope
 * @param callback - Function that receives the anime.js scope instance
 * @returns The scope ref (can be used to access scope.current if needed)
 *
 * @example
 * ```tsx
 * import { waapi } from 'animejs';
 * * const Example = () => {
 * const textRef = useRef<HTMLDivElement>(null);
 *
 * useAnime(textRef, () => {
 * waapi.animate('.text', {
 * translateX: [0, 100],
 * duration: 1000,
 * easing: 'easeInOutQuad'
 * });
 * });
 *
 * return <div ref={textRef}><div className="text">Content</div></div>;
 * }
 * ```
 */
export const useAnime = (
	rootRef: RefObject<HTMLElement | null>,
	callback: AnimeCallback,
): RefObject<Scope | null> => {
	const scopeRef = useRef<Scope | null>(null);
	const callbackRef = useRef(callback);

	useEffect(() => {
		callbackRef.current = callback;
	}, [callback]);

	useEffect(() => {
		if (!rootRef.current) return;

		scopeRef.current = createScope({ root: rootRef }).add((self) => {
			if (!self)
				throw new Error(
					`Scope could not be created in useAnime hook. 'self' instance of Scope is undefined.`,
				);
			callbackRef.current(self);
		});

		return () => {
			scopeRef.current?.revert();
		};
	}, [rootRef]);

	return scopeRef;
};

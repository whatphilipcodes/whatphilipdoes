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
 * const Example = () => {
 *   const textRef = useRef<HTMLDivElement>(null);
 *
 *   useAnime(textRef, (self) => {
 *     self.animate('.text', {
 *       translateX: [0, 100],
 *       duration: 1000,
 *       easing: 'easeInOutQuad'
 *     });
 *   });
 *
 *   return <div ref={textRef}><div className="text">Content</div></div>;
 * }
 * ```
 */
export const useAnime = (
	rootRef: RefObject<HTMLElement | null>,
	callback: AnimeCallback,
): RefObject<Scope | null> => {
	const scopeRef = useRef<Scope | null>(null);

	useEffect(() => {
		if (!rootRef.current) return;
		scopeRef.current = createScope({ root: rootRef }).add((self) => {
			if (!self)
				throw new Error(
					`Scope could not be created in useAnime hook. 'self' instance of Scope is undefined.`,
				);
			callback(self);
		});

		return () => scopeRef.current?.revert();
	}, [rootRef, callback]);

	return scopeRef;
};

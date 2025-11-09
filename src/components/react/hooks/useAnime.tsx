import { createScope, type Scope } from 'animejs';
import { useEffect, useRef, type RefObject } from 'react';

type AnimeCallback = (self: Scope) => void;

/**
 * Custom hook to manage anime.js scope with proper cleanup for React components.
 *
 * @param rootRef - RefObject pointing to the root element for the animation scope
 * @param callback - Function that receives the scope self and an isActive ref
 * @returns The scope ref (can be used to access scope.current.methods if needed)
 *
 * @example
 * ```tsx
 * const Example = () => {
 *   const textRef = useRef<HTMLDivElement>(null);
 *
 *   useAnime(textRef, (self, isActive) => {
 *     const split = splitText('.text', { words: { wrap: 'clip' } });
 *
 *     const animateWords = () => {
 *       if (!isActive.current) return;
 *
 *       waapi.animate(split.words, { ... })
 *         .then(() => {
 *           if (!isActive.current) return;
 *           animateWords();
 *         });
 *     };
 *
 *     animateWords();
 *   });
 *
 *   return <div ref={textRef}>Content</div>;
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

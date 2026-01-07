import { splitText, stagger, waapi } from 'animejs';
import { useRef } from 'react';
import { useAnime } from '../hooks/useAnime';

const TextAnimation = () => {
	const textRef = useRef<HTMLDivElement>(null);

	useAnime(textRef, () => {
		const textEl = textRef.current as HTMLDivElement;
		const split = splitText(textEl, {
			words: { wrap: 'clip' },
		});

		const asyncDependant = async () => {
			if (!split.words.length) return;
			const animIn = waapi.animate(split.words, {
				y: { from: '100%', to: '0%', duration: 750, ease: 'out(3)' },
				delay: stagger(100),
			});
			await animIn;
			if (!split.words.length) return;
			const animOut = waapi.animate(split.words, {
				y: { from: '0%', to: '-100%', duration: 750, ease: 'in(3)' },
				delay: stagger(100, { start: 300 }),
			});
			await animOut;
			if (!split.words.length) return;
			await asyncDependant();
		};
		asyncDependant();
	});

	return (
		<div
			className='h-32 font-bold text-8xl text-mono-200 leading-29'
			ref={textRef}
		>
			what philip does
		</div>
	);
};

export default TextAnimation;

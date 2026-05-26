import { get, type WAAPIAnimation, waapi } from 'animejs';
import { useEffect, useRef } from 'react';

const PillMenuContextAction = () => {
	const context = 'contact';
	const actionRef = useRef<HTMLAnchorElement>(null);

	useEffect(() => {
		const btn = actionRef.current;
		if (!btn) return;

		// Use scrollWidth to calculate accurate dimensions even if parent is temporarily restricting width during entrance
		const originalWidth = btn.scrollWidth;
		const originalPaddingLeft = get(btn, 'paddingLeft', 'px');
		const originalPaddingRight = get(btn, 'paddingRight', 'px');

		const config = {
			hideThreshold: 60,
			showThreshold: 40,
		};

		let lastScrollY = window.scrollY;
		let scrollDelta = 0;
		let isHidden = false;
		let ticking = false;
		let currentAnimation: WAAPIAnimation | null = null;

		const handleScroll = () => {
			if (!ticking) {
				window.requestAnimationFrame(() => {
					const currentScrollY = window.scrollY;
					const diff = currentScrollY - lastScrollY;

					if (diff > 0) {
						if (scrollDelta < 0) scrollDelta = 0;
						scrollDelta += diff;

						if (scrollDelta > config.hideThreshold && !isHidden) {
							isHidden = true;
							if (currentAnimation) currentAnimation.cancel();

							currentAnimation = waapi.animate(btn, {
								width: [`${originalWidth}px`, 0],
								paddingLeft: [originalPaddingLeft, 0],
								paddingRight: [originalPaddingRight, 0],
								opacity: [1, 0],
								duration: 350,
								ease: 'outQuad',
							});
						}
					} else if (diff < 0) {
						if (scrollDelta > 0) scrollDelta = 0;
						scrollDelta += diff;

						if (Math.abs(scrollDelta) > config.showThreshold && isHidden) {
							isHidden = false;
							if (currentAnimation) currentAnimation.cancel();

							currentAnimation = waapi.animate(btn, {
								width: [0, `${originalWidth}px`],
								paddingLeft: [0, originalPaddingLeft],
								paddingRight: [0, originalPaddingRight],
								opacity: [0, 1],
								duration: 350,
								ease: 'outQuad',
							});
						}
					}

					lastScrollY = currentScrollY;
					ticking = false;
				});
				ticking = true;
			}
		};

		window.addEventListener('scroll', handleScroll, { passive: true });

		return () => {
			window.removeEventListener('scroll', handleScroll);
			if (currentAnimation) currentAnimation.cancel();
		};
	}, []);

	return (
		<a
			ref={actionRef}
			href='/'
			className='flex h-full shrink-0 items-center pr-2'
			style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}
		>
			<div className='rounded-full border border-mono-200 px-2 py-1 text-center text-mono-200'>
				{context}
			</div>
		</a>
	);
};

export default PillMenuContextAction;

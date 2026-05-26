import { useAnime } from '@react/hooks/useAnime';
import { waapi } from 'animejs';
import { useRef, useState } from 'react';
import PillMenuBar from './PillMenuBar';
import PillMenuContextAction from './PillMenuContextAction';

type PillMenuProps = {
	pathname: string;
};

const PillMenu = ({ pathname }: PillMenuProps) => {
	const rootRef = useRef<HTMLElement>(null);
	const [isAnimating, setIsAnimating] = useState(true);

	const routes = [
		{ text: 'does', href: '/' },
		{ text: 'built', href: '/built/' },
		{ text: 'knows', href: '/knows/' },
	];

	const scope = useAnime(rootRef, () => {
		const root = rootRef.current;
		if (!root) return;

		const content = root.querySelector('.menu-content') as HTMLElement;
		if (!content) return;

		// Extract accurate target width from unconstrained inner wrapper
		const targetWidth = `${content.scrollWidth}px`;

		// Entrance animation: Circle to Pill
		waapi.animate(root, {
			width: ['56px', targetWidth],
			duration: 600,
			ease: 'outExpo',
		});

		waapi
			.animate(content, {
				opacity: [0, 1],
				duration: 400,
				delay: 200,
				ease: 'outQuad',
			})
			.then(() => {
				setIsAnimating(false);
				// Release explicitly bound width to allow scroll listeners to modify inner elements naturally
				root.style.width = 'auto';
			});
	});

	const handleNavigation = (
		e: React.MouseEvent<HTMLAnchorElement>,
		href: string,
	) => {
		e.preventDefault();
		if (!scope.current || !rootRef.current || isAnimating) return;

		const root = rootRef.current;
		const content = root.querySelector('.menu-content') as HTMLElement;

		setIsAnimating(true);

		// Lock the dynamic computed width before animating the collapse
		// This prevents the parent from snapping to 'auto' width abruptly
		const currentWidth = `${root.offsetWidth}px`;
		root.style.width = currentWidth;

		waapi.animate(content, {
			opacity: [1, 0],
			duration: 200,
			ease: 'inOutQuad',
		});

		waapi
			.animate(root, {
				width: [currentWidth, '56px'],
				duration: 400,
				delay: 100,
				ease: 'inExpo',
			})
			.then(() => {
				window.location.href = href;
			});
	};

	return (
		<nav
			ref={rootRef}
			className='fixed bottom-2 left-1/2 z-50 flex h-14 -translate-x-1/2 flex-row items-center overflow-hidden rounded-full border border-mono-200 bg-mono-100/50 text-lg backdrop-blur-md md:bottom-8 dark:border-mono-900 dark:bg-mono-950/50'
			style={{ width: '56px' }}
		>
			<div className='menu-content flex h-full w-max items-center opacity-0'>
				<PillMenuBar
					pathname={pathname}
					routes={routes}
					onNavigate={handleNavigation}
				/>
				<PillMenuContextAction />
			</div>
		</nav>
	);
};

export default PillMenu;

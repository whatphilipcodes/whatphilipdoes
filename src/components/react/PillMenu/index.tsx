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

	// Dedicated state to drive the CSS opacity transition
	const [isContentVisible, setIsContentVisible] = useState(false);

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

		const targetWidth = `${content.scrollWidth}px`;

		// 1. Expand the width using WAAPI
		waapi
			.animate(root, {
				width: ['56px', targetWidth],
				duration: 600,
				ease: 'outExpo',
			})
			.then(() => {
				setIsAnimating(false);
				root.style.width = 'auto';
			});

		// 2. Trigger standard CSS transition (delay is handled in the style prop)
		setIsContentVisible(true);
	});

	const handleNavigation = (
		e: React.MouseEvent<HTMLAnchorElement>,
		href: string,
	) => {
		e.preventDefault();
		if (!scope.current || !rootRef.current || isAnimating) return;

		const root = rootRef.current;
		setIsAnimating(true);

		// 1. Trigger CSS fade-out immediately
		setIsContentVisible(false);

		const currentWidth = `${root.offsetWidth}px`;
		root.style.width = currentWidth;

		// 2. Wait 200ms for the CSS fade to complete before collapsing the width
		setTimeout(() => {
			waapi
				.animate(root, {
					width: [currentWidth, '56px'],
					duration: 400,
					ease: 'inExpo',
				})
				.then(() => {
					window.location.href = href;
				});
		}, 200);
	};

	return (
		<nav
			ref={rootRef}
			className='fixed bottom-2 left-1/2 z-50 flex h-14 -translate-x-1/2 flex-row items-center overflow-hidden rounded-full border border-mono-200 bg-mono-100 text-lg md:bottom-8 dark:border-mono-900 dark:bg-mono-950'
			style={{
				width: '56px',
				transform: 'translateZ(0)',
			}}
		>
			<div
				className='menu-content flex h-full w-max items-center'
				style={{
					opacity: isContentVisible ? 1 : 0,
					// 400ms duration with 200ms delay on entry, 200ms duration with 0 delay on exit
					transition: isContentVisible
						? 'opacity 400ms ease-out 200ms'
						: 'opacity 200ms ease-in-out',
				}}
			>
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

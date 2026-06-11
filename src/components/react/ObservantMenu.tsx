import { useStore } from '@nanostores/react';
import { useScroll } from '@react/hooks/useScroll';
import { AnimatePresence, motion, type Transition } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { currentActionStore } from '@/store/menuStore'; // Adjust path

type ObservantMenuProps = {
	pathname: string;
};

const fluidTransition: Transition = {
	type: 'spring',
	stiffness: 500,
	damping: 40,
	mass: 1,
};

const fadeTransition: Transition = {
	duration: 0.15,
	ease: 'easeInOut',
};

type MenuState = 'mounting' | 'idle' | 'collapsing' | 'exiting';

const ObservantMenu = ({ pathname }: ObservantMenuProps) => {
	const routes = [
		{ text: 'does', href: '/' },
		{ text: 'built', href: '/built/' },
		{ text: 'knows', href: '/knows/' },
	];

	const { yDir, yArrived, isScrolling } = useScroll(window);

	// Consume the shared store
	const currentAction = useStore(currentActionStore);

	const [actionVisible, setActionVisible] = useState(true);
	const [menuState, setMenuState] = useState<MenuState>('mounting');
	const [isExpanded, setIsExpanded] = useState(false);

	const isLocked = useRef(false);
	const isScrollingRef = useRef(isScrolling);

	useEffect(() => {
		const timer = setTimeout(() => {
			setMenuState('idle');
		}, 100);
		return () => clearTimeout(timer);
	}, []);

	useEffect(() => {
		if (menuState === 'idle') {
			const timer = setTimeout(() => setIsExpanded(true), 400);
			return () => clearTimeout(timer);
		} else {
			setIsExpanded(false);
		}
	}, [menuState]);

	useEffect(() => {
		isScrollingRef.current = isScrolling;
	}, [isScrolling]);

	useEffect(() => {
		if (currentAction) {
			setActionVisible(true);
			if (isScrollingRef.current) isLocked.current = true;
		}
	}, [currentAction]);

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

	const handleNavigationClick = (
		e: React.MouseEvent<HTMLAnchorElement>,
		href: string,
	) => {
		e.preventDefault();

		if (pathname === href) return;

		setMenuState('collapsing');

		setTimeout(() => {
			setMenuState('exiting');

			setTimeout(() => {
				window.location.href = href;
			}, 150);
		}, 400);
	};

	return (
		<div className='pointer-events-none fixed inset-x-0 bottom-2 z-50 mx-auto flex justify-center md:bottom-8'>
			<motion.nav
				initial={{ width: 56 }}
				animate={{ width: menuState === 'idle' ? 'auto' : 56 }}
				transition={fluidTransition}
				id='pill-menu'
				style={{ viewTransitionName: 'pill-menu', borderRadius: 9999 }}
				className='pointer-events-auto relative flex h-14 min-w-14 items-center justify-center overflow-hidden border border-mono-200 bg-mono-100 dark:border-mono-900 dark:bg-mono-950'
			>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: menuState === 'collapsing' ? 1 : 0 }}
					transition={fadeTransition}
					className='pointer-events-none absolute inset-0 flex items-center justify-center'
				>
					<div className='h-5 w-5 animate-spin rounded-full border-2 border-mono-300 border-t-mono-900 dark:border-mono-700 dark:border-t-mono-100' />
				</motion.div>

				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: menuState === 'idle' ? 1 : 0 }}
					transition={fadeTransition}
					className='flex h-full w-max items-center'
				>
					<div className='flex h-full'>
						{routes.map((route) => {
							const isActive = pathname === route.href;
							return (
								<a
									key={route.href}
									href={route.href}
									onClick={(e) => handleNavigationClick(e, route.href)}
									className={`relative z-10 flex h-full shrink-0 cursor-pointer flex-row items-center justify-center gap-1 rounded-full px-2 first:pl-4 last:pr-4 ${
										isActive
											? 'text-mono-900 dark:text-mono-100'
											: 'text-mono-400 hover:text-mono-600 dark:hover:text-mono-200'
									}`}
								>
									<span>/</span>
									<span>{route.text}</span>
								</a>
							);
						})}
					</div>

					<AnimatePresence mode='wait'>
						{currentAction && actionVisible && isExpanded && (
							<motion.div
								key={`${currentAction.href}-${currentAction.action}`}
								initial={{ width: 0, opacity: 0 }}
								animate={{ width: 'auto', opacity: 1 }}
								exit={{ width: 0, opacity: 0 }}
								transition={fluidTransition}
								className='overflow-hidden'
							>
								<div className='flex h-full w-max items-center pr-2'>
									<a
										href={currentAction.href}
										onClick={(e) =>
											handleNavigationClick(e, currentAction.href)
										}
										className='block w-max whitespace-nowrap rounded-full border border-mono-200 px-4 py-1 text-center text-mono-200'
									>
										{currentAction.action}
									</a>
								</div>
							</motion.div>
						)}
					</AnimatePresence>
				</motion.div>
			</motion.nav>
		</div>
	);
};

export default ObservantMenu;

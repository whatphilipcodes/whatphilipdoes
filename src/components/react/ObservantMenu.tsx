import { useStore } from '@nanostores/react';
import AnchorButton from '@react/AnchorButton';
import { useScroll } from '@react/hooks/useScroll';
import { AnimatePresence, motion, type Transition } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { currentActionStore } from '@/store/menuStore';

interface ObservantMenuProps {
	pathname: string;
}

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

export default function ObservantMenu({ pathname }: ObservantMenuProps) {
	const routes = [
		{ text: 'does', href: '/' },
		{ text: 'built', href: '/built/' },
		{ text: 'knows', href: '/knows/' },
	];

	const { yDir, yArrived, isScrolling } = useScroll(window);

	const currentAction = useStore(currentActionStore);

	const [actionVisible, setActionVisible] = useState(true);
	const [actionFocused, setActionFocused] = useState(false);
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
		if (isLocked.current || yArrived.bottom || yArrived.top || actionFocused)
			return;

		if (yDir.down) {
			setActionVisible(false);
		} else if (yDir.up) {
			setActionVisible(true);
		}
	}, [
		isScrolling,
		yArrived.bottom,
		yArrived.top,
		yDir.down,
		yDir.up,
		actionFocused,
	]);

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
		<div className='pointer-events-none fixed inset-x-0 bottom-4 mx-auto flex justify-center md:bottom-8'>
			<motion.header
				initial={{ width: 56 }}
				animate={{ width: menuState === 'idle' ? 'auto' : 56 }}
				transition={fluidTransition}
				id='obs-menu'
				style={{
					borderRadius: 32,
				}}
				className='pointer-events-auto relative flex h-14 min-w-14 items-center justify-center overflow-hidden ring ring-mono-200 dark:ring-mono-900'
			>
				<motion.span
					initial={{ opacity: 0 }}
					animate={{
						opacity:
							menuState === 'collapsing' || menuState === 'exiting' ? 1 : 0,
					}}
					transition={fadeTransition}
					aria-hidden='true'
					className='pointer-events-none absolute flex items-center justify-center text-mono-950 dark:text-mono-50'
				>
					wp
				</motion.span>

				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: menuState === 'idle' ? 1 : 0 }}
					transition={fadeTransition}
					className='flex h-full w-max items-center'
				>
					<nav className='flex h-full'>
						{routes.map((route) => {
							const isActive = pathname === route.href;
							return (
								<a
									key={route.href}
									href={route.href}
									onClick={(e) => handleNavigationClick(e, route.href)}
									className={`group relative flex h-full shrink-0 cursor-pointer flex-row items-center justify-center px-2 transition-colors first:pl-4 last:pr-4 focus:outline-none ${
										isActive
											? 'text-mono-950 dark:text-mono-50'
											: 'text-mono-400 hover:text-mono-800 dark:text-mono-600 dark:hover:text-mono-200'
									}`}
								>
									<span className='group-focus-visible:accessible flex items-center gap-1 rounded-4xl group-focus-visible:outline-offset-10'>
										<span>/</span>
										<span>{route.text}</span>
									</span>
								</a>
							);
						})}
					</nav>

					<AnimatePresence mode='wait'>
						{currentAction && actionVisible && isExpanded && (
							<motion.div
								key={`${currentAction.href}-${currentAction.action}`}
								initial={{ width: 0, opacity: 0 }}
								animate={{ width: 'auto', opacity: 1 }}
								exit={{ width: 0, opacity: 0 }}
								transition={fluidTransition}
								className='h-full'
								onFocus={() => setActionFocused(true)}
								onBlur={() => setActionFocused(false)}
							>
								<a
									className={
										'group flex h-full w-max items-center pr-2 pl-px focus:outline-none'
									}
									href={currentAction.href}
								>
									<AnchorButton text={currentAction.action} />
								</a>
							</motion.div>
						)}
					</AnimatePresence>
				</motion.div>
			</motion.header>
		</div>
	);
}

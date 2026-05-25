import PillMenuBar from './PillMenuBar';
import PillMenuContextAction from './PillMenuContextAction';

// const MAIL = import.meta.env.MAIL;

type PillMenu = {
	pathname: string;
};

const PillMenu = ({ pathname }: PillMenu) => {
	const routes = [
		{ text: 'does', href: '/' },
		{ text: 'built', href: '/built/' },
		{ text: 'knows', href: '/knows/' },
	];

	return (
		<nav className='view-nav fixed bottom-2 left-1/2 z-50 flex h-14 -translate-x-1/2 flex-row items-center rounded-4xl border-mono-200 bg-mono-100/50 text-lg backdrop-blur-md md:bottom-8 dark:border-mono-900 dark:bg-mono-950/50'>
			<PillMenuBar pathname={pathname} routes={routes} />
			<PillMenuContextAction />
		</nav>
	);
};

export default PillMenu;

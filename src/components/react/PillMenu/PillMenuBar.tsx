type PillMenuBarProps = {
	pathname: string;
	routes: { text: string; href: string }[];
	onNavigate: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
};

const PillMenuBar = ({ pathname, routes, onNavigate }: PillMenuBarProps) => {
	return (
		<div className='flex h-full'>
			{routes.map((route) => {
				const isActive = pathname === route.href;
				return (
					<a
						key={route.href}
						href={route.href}
						onClick={(e) => onNavigate(e, route.href)}
						className={`flex h-full cursor-pointer flex-row items-center justify-center gap-1 rounded-full px-2 first:pl-4 last:pr-4 ${
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
	);
};

export default PillMenuBar;

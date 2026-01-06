const NavBar = () => {
	return (
		<nav className='fixed bottom-10 left-1/2 -translate-x-1/2 text-mono-500 text-lg z-1'>
			<div className='flex flex-row place-items-center h-12 gap-6'>
				<a className='border border-mono-800 rounded-lg px-5 py-2' href='/'>
					wp
				</a>
				<div className='flex flex-row border border-mono-800 text-mono-800 rounded-lg px-5 py-2 gap-8'>
					<div className='flex flex-row gap-2'>
						<span>/</span>
						<a href='#does'>does</a>
					</div>
					<div className='flex flex-row gap-2'>
						<span>/</span>
						<a href='#built'>built</a>
					</div>
					<div className='flex flex-row gap-2'>
						<span>/</span>
						<a href='#knows'>knows</a>
					</div>
				</div>
				<a
					className='border border-mono-800 rounded-lg px-5 py-2'
					href='#contact'
				>
					contact
				</a>
			</div>
		</nav>
	);
};

export default NavBar;

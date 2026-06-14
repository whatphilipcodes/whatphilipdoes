type GridMainProps = {
	children: React.ReactNode;
};

const GridMain = ({ children }: GridMainProps) => {
	return (
		<div className='grid grid-cols-4 gap-x-4 md:grid-cols-8 lg:grid-cols-12'>
			{children}
		</div>
	);
};

export default GridMain;

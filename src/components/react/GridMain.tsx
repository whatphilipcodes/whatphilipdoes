interface GridMainProps {
	children: React.ReactNode;
}

export default function GridMain({ children }: GridMainProps) {
	return (
		<div className='grid grid-cols-4 gap-x-4 md:grid-cols-8 lg:grid-cols-12'>
			{children}
		</div>
	);
}

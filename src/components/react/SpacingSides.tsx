interface SpacingSidesProps {
	children: React.ReactNode;
}

export default function SpacingSides({ children }: SpacingSidesProps) {
	return (
		<div className='mx-auto max-w-360 px-4 md:px-8 lg:px-16'>{children}</div>
	);
}

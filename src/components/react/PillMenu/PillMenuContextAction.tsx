const PillMenuContextAction = () => {
	const context = 'contact';
	return (
		<a href='/' className='flex h-full items-center pr-3'>
			<div className='rounded-4xl border border-mono-200 px-2 py-1 text-center text-mono-200'>
				{context}
			</div>
		</a>
	);
};
export default PillMenuContextAction;

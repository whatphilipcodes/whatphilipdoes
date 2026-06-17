interface LegalScopeProps {
	doc: string;
	main: string;
	subdomains: string;
}

export default function LegalScope({ doc, main, subdomains }: LegalScopeProps) {
	const subList = (subdomains || '')
		.split(',')
		.map((s) => s.trim())
		.filter(Boolean);

	let host = main || '';
	try {
		host = new URL(main).hostname;
	} catch {
		host = main.replace(/^https?:\/\//, '').replace(/\/.*$/, '');
	}

	const urls = subList.map((s) => `https://${s}.${host}`);

	if (urls.length === 0) return null;

	return (
		<div className='text-prim-500'>
			<p>
				Alongside this domain (
				<a
					href={main}
					target='_blank'
					rel='noopener noreferrer'
					className='underline'
				>
					{main}
				</a>
				) this {doc} is also valid for the following subdomains:
			</p>
			<ul className='ml-5 list-disc'>
				{urls.map((u) => (
					<li key={u}>
						<a
							href={u}
							target='_blank'
							rel='noopener noreferrer'
							className='underline'
						>
							{u}
						</a>
					</li>
				))}
			</ul>
		</div>
	);
}

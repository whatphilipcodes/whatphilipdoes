interface LegalContactProps {
	children: React.ReactNode;
}

export default function LegalContact({ children }: LegalContactProps) {
	return <div className='text-prim-500'>{children}</div>;
}

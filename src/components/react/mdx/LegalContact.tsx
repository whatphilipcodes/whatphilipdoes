type LegalContactProps = {
	children: React.ReactNode;
};

const LegalContact = ({ children }: LegalContactProps) => {
	return <div className='text-prim-500'>{children}</div>;
};

export default LegalContact;

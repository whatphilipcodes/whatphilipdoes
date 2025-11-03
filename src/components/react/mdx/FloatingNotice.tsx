type FloatingNoticeProps = {
	children: React.ReactNode;
};

const FloatingNotice = ({ children }: FloatingNoticeProps) => {
	return <div>{children}</div>;
};

export default FloatingNotice;

interface FloatingNoticeProps {
	children: React.ReactNode;
}

export default function FloatingNotice({ children }: FloatingNoticeProps) {
	return <div>{children}</div>;
}

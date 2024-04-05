export const useResponsive = () => {
	// this is the breakpoints config -> needs to be synced with tailwind.config.js //todo: make this dynamic
	return useBreakpoints({
		sm: '640px',
		md: '768px',
		lg: '1200px',
	})
}

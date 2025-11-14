import { useMediaProgress } from './hooks/useMediaProgress';
import { useEffect } from 'react';

const Preloader = () => {
	const { percent } = useMediaProgress();
	useEffect(() => {
		console.log(percent);
	}, [percent]);

	useEffect(() => {
		const handleLoad = () => {
			console.log('Page loaded completely');
		};
		window.addEventListener('load', handleLoad);
		return () => window.removeEventListener('load', handleLoad);
	}, []);

	return <>Preloader</>;
};

export default Preloader;

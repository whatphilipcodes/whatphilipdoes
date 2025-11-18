const response = await fetch('/meta.json');
const { preloadMediaCount } = await response.json();

const tracked: string[] = [];
const indicators = ['img', 'audio', 'video'];

const track = (candidates: PerformanceResourceTiming[]) => {
	candidates.forEach((c) => {
		if (tracked.includes(c.name)) return;
		if (!indicators.includes(c.initiatorType)) return;
		tracked.push(c.name);
	});
};

const usePreloading = (
	onProgress: (progress: number) => void,
	onComplete: () => void,
) => {
	const observer = new PerformanceObserver(
		(list: PerformanceObserverEntryList, _observer: PerformanceObserver) => {
			const entries = list.getEntries() as PerformanceResourceTiming[];
			track(entries);
			onProgress(Math.min((tracked.length / preloadMediaCount) as number, 1));
		},
	);
	const conclude = () => {
		window.removeEventListener('load', conclude);
		observer.disconnect();
		onProgress(1);
		onComplete();
	};
	observer.observe({ type: 'resource', buffered: true });
	window.addEventListener('load', conclude);
};

export { usePreloading };

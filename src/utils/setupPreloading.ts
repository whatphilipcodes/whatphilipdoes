const MEDIA_ELEMENTS = ['video', 'audio'];
const LOADABLE_ELEMENTS = [
	'img',
	'script',
	'iframe',
	'link',
	'style',
	'embed',
	'object',
	'track',
];

const getEventType = (tagName: string): string | null => {
	if (MEDIA_ELEMENTS.includes(tagName)) return 'canplay';
	if (LOADABLE_ELEMENTS.includes(tagName)) return 'load';
	return null;
};

const setupPreloading = (
	onProgress: (progress: number) => void,
	onComplete: () => void,
	dataAttribute: string = 'data-preloader',
	simulateLoad = false,
) => {
	let loaded = 0;

	const elements = document.querySelectorAll(`[${dataAttribute}]`);
	const total = elements.length;

	if (simulateLoad) {
		onProgress(0);
		const stepsCount = 5;
		const steps: number[] = [];
		for (let i = 0; i < stepsCount - 1; i++) {
			steps.push(Math.random());
		}
		steps.sort((a, b) => a - b);
		steps.push(1);

		const timeouts: number[] = [];
		let cumulative = 0;
		for (let i = 0; i < steps.length; i++) {
			const delay = Math.floor(400 + Math.random() * (1200 - 400));
			cumulative += delay;
			const value = Math.min(Math.max(steps[i], 0), 1);
			const id = window.setTimeout(() => {
				onProgress(value);
				if (value === 1) onComplete();
			}, cumulative);
			timeouts.push(id);
		}

		const clearSim = () => {
			for (const id of timeouts) {
				clearTimeout(id);
			}
		};
		window.addEventListener('pagehide', clearSim, { once: true });
		window.addEventListener('beforeunload', clearSim, { once: true });
		return;
	}

	const handleLoad = () => {
		loaded++;
		onProgress(Math.min(loaded / total, 1));
	};

	const deployListeners = (elements: NodeListOf<Element>) => {
		elements.forEach((el) => {
			const tagName = el.tagName.toLowerCase();
			const eventType = getEventType(tagName);

			if (eventType) {
				el.addEventListener(eventType, handleLoad, { once: true });
			} else {
				console.error(
					`[data-preloader] Unsupported element type: <${tagName}>. Supported elements: <${LOADABLE_ELEMENTS.join('>, <')}>, <${MEDIA_ELEMENTS.join('>, <')}>.`,
				);
			}
		});
	};

	const cancelListeners = (elements: NodeListOf<Element>) => {
		elements.forEach((el) => {
			const tagName = el.tagName.toLowerCase();
			const eventType = getEventType(tagName);

			if (eventType) {
				el.removeEventListener(eventType, handleLoad);
			} else {
				console.error(
					`[data-preloader] Unsupported element type: <${tagName}>. Supported elements: <${LOADABLE_ELEMENTS.join('>, <')}>, <${MEDIA_ELEMENTS.join('>, <')}>.`,
				);
			}
		});
	};

	deployListeners(elements);

	window.addEventListener(
		'load',
		() => {
			cancelListeners(elements);
			onProgress(1);
			onComplete();
		},
		{ once: true },
	);
};

export { setupPreloading };

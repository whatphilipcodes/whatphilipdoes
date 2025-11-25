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
) => {
	let loaded = 0;

	const elements = document.querySelectorAll(`[${dataAttribute}]`);
	const total = elements.length;

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

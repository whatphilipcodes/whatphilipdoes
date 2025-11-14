import { useState, useEffect } from 'react';

export const useMediaProgress = () => {
	const [progress, setProgress] = useState({
		total: 0,
		loaded: 0,
		percent: 0,
	});

	useEffect(() => {
		const listeners = new Map<
			HTMLElement,
			{ event: string; handler: () => void }
		>();
		const assets: (HTMLImageElement | HTMLVideoElement)[] = Array.from(
			document.querySelectorAll('img, video'),
		);

		const totalAssets = assets.length;
		if (totalAssets === 0) {
			setProgress({ total: 0, loaded: 0, percent: 100 });
			return;
		}

		let loadedCount = 0;
		const assetsToTrack: (HTMLImageElement | HTMLVideoElement)[] = [];

		assets.forEach((asset) => {
			const isLoaded =
				asset.tagName === 'IMG'
					? (asset as HTMLImageElement).complete &&
						(asset as HTMLImageElement).naturalWidth > 0
					: (asset as HTMLVideoElement).readyState >= 4;

			isLoaded ? loadedCount++ : assetsToTrack.push(asset);
		});

		setProgress({
			total: totalAssets,
			loaded: loadedCount,
			percent: totalAssets > 0 ? (loadedCount / totalAssets) * 100 : 0,
		});

		if (assetsToTrack.length === 0) return;

		const updateProgress = () => {
			loadedCount++;
			const newPercent = (loadedCount / totalAssets) * 100;

			requestAnimationFrame(() => {
				setProgress({
					total: totalAssets,
					loaded: loadedCount,
					percent: newPercent,
				});
			});
		};

		assetsToTrack.forEach((asset) => {
			const eventName = asset.tagName === 'IMG' ? 'load' : 'canplaythrough';

			const cleanup = () => {
				const info = listeners.get(asset);
				if (info) {
					asset.removeEventListener(info.event, info.handler);
					asset.removeEventListener('error', info.handler);
					listeners.delete(asset);
				}
			};

			const handler = () => {
				updateProgress();
				cleanup();
			};

			listeners.set(asset, { event: eventName, handler });
			asset.addEventListener(eventName, handler);
			asset.addEventListener('error', handler);
		});
		return () => {
			listeners.forEach((info, asset) => {
				asset.removeEventListener(info.event, info.handler);
				asset.removeEventListener('error', info.handler);
			});
		};
	}, []);

	return progress;
};

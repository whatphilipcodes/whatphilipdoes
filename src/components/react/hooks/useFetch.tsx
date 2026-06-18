import { useEffect, useState } from 'react';

const cache = new Map<string, unknown>();

const useFetch = <T,>(
	url: string,
	options?: RequestInit,
	pollIntervalMs?: number,
) => {
	const [data, setData] = useState<T | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	const optionsString = options ? JSON.stringify(options) : '';

	useEffect(() => {
		let isMounted = true;
		let timeoutId: ReturnType<typeof setTimeout>;

		const fetchData = async () => {
			const cacheKey = JSON.stringify({ url, optionsString });

			if (!cache.has(cacheKey)) {
				setLoading(true);
			}

			try {
				const parsedOptions = optionsString
					? JSON.parse(optionsString)
					: undefined;
				const res = await fetch(url, parsedOptions);
				if (!res.ok) throw new Error('Network response was not ok');

				const json = (await res.json()) as T;

				if (isMounted) {
					setData(json);
					cache.set(cacheKey, json);
					setError(null);
				}
			} catch (err) {
				if (isMounted) setError(err as Error);
			} finally {
				if (isMounted) setLoading(false);
			}

			if (isMounted && pollIntervalMs) {
				timeoutId = setTimeout(fetchData, pollIntervalMs);
			}
		};

		fetchData();

		return () => {
			isMounted = false;
			if (timeoutId) clearTimeout(timeoutId);
		};
	}, [url, optionsString, pollIntervalMs]);

	return { data, loading, error };
};

export default useFetch;

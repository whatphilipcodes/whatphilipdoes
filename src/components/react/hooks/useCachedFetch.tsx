import { useEffect, useRef, useState } from 'react';

export interface CachedFetchOptions {
	/**
	 * Callback to extract the precise timestamp (in milliseconds)
	 * when the rate limit will reset based on the response headers.
	 */
	getResetTimeMs?: (response: Response) => number | null;
}

export function useCachedFetch<T>(
	url: string,
	cacheKey: string,
	ttlMs: number,
	options?: CachedFetchOptions,
) {
	const [data, setData] = useState<T | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);
	const getResetTimeMsRef = useRef(options?.getResetTimeMs);

	useEffect(() => {
		getResetTimeMsRef.current = options?.getResetTimeMs;
	}, [options?.getResetTimeMs]);

	useEffect(() => {
		let isMounted = true;
		let timeoutId: NodeJS.Timeout;

		const fetchData = async () => {
			const lockoutKey = `${cacheKey}_lockout`;
			const lockoutUntil = localStorage.getItem(lockoutKey);

			if (lockoutUntil && Date.now() < parseInt(lockoutUntil, 10)) {
				const cached = localStorage.getItem(cacheKey);
				if (cached && isMounted) {
					setData(JSON.parse(cached).payload);
					setLoading(false);
				}

				const delay = parseInt(lockoutUntil, 10) - Date.now();
				timeoutId = setTimeout(fetchData, delay);
				return;
			}

			const cached = localStorage.getItem(cacheKey);
			if (cached) {
				try {
					const { timestamp, payload } = JSON.parse(cached);
					if (isMounted) setData(payload);

					const age = Date.now() - timestamp;
					if (age < ttlMs) {
						if (isMounted) setLoading(false);
						timeoutId = setTimeout(fetchData, ttlMs - age);
						return;
					}
				} catch (_e) {
					localStorage.removeItem(cacheKey);
				}
			}

			try {
				const response = await fetch(url);

				if (response.status === 403 || response.status === 429) {
					let resetMs: number | null = null;

					if (getResetTimeMsRef.current) {
						resetMs = getResetTimeMsRef.current(response);
					}

					if (resetMs) {
						localStorage.setItem(lockoutKey, resetMs.toString());
					} else {
						localStorage.setItem(lockoutKey, (Date.now() + 3600000).toString());
					}
					throw new Error('Rate limit exceeded');
				}

				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}

				const result = await response.json();

				localStorage.setItem(
					cacheKey,
					JSON.stringify({
						timestamp: Date.now(),
						payload: result,
					}),
				);

				if (isMounted) {
					setData(result);
					setError(null);
				}
			} catch (err) {
				if (isMounted) {
					setError(err instanceof Error ? err : new Error('Fetch failed'));
				}
			} finally {
				if (isMounted) {
					setLoading(false);
					timeoutId = setTimeout(fetchData, ttlMs);
				}
			}
		};

		fetchData();

		return () => {
			isMounted = false;
			clearTimeout(timeoutId);
		};
	}, [url, cacheKey, ttlMs]);

	return { data, loading, error };
}

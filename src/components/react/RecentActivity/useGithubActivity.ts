import { useCachedFetch } from '@react/hooks/useCachedFetch';
import { useEffect, useState } from 'react';
import type { EnrichedActivity, GitHubEvent } from './types';
import { getGitHubResetTime, parseGitHubEvent } from './utils';

export function useGitHubActivity(username: string) {
	const url = `https://api.github.com/users/${username}/events/public`;
	const cacheKey = `github_events_${username}`;

	const { data: events, error } = useCachedFetch<GitHubEvent[]>(
		url,
		cacheKey,
		10000,
		{ getResetTimeMs: getGitHubResetTime },
	);

	const [isLoading, setIsLoading] = useState(true);
	const [activities, setActivities] = useState<EnrichedActivity[]>([]);

	useEffect(() => {
		let isMounted = true;

		const processEvents = async () => {
			if (!events) {
				if (error && isMounted) setIsLoading(false);
				return;
			}

			if (events.length === 0) {
				if (isMounted) {
					setActivities([]);
					setIsLoading(false);
				}
				return;
			}

			const validEvents: {
				event: GitHubEvent;
				parsed: NonNullable<ReturnType<typeof parseGitHubEvent>>;
			}[] = [];

			for (const event of events) {
				const parsed = parseGitHubEvent(event);
				if (parsed) {
					validEvents.push({ event, parsed });
				}
				if (validEvents.length === 3) break;
			}

			if (validEvents.length === 0) {
				if (isMounted) {
					setActivities([]);
					setIsLoading(false);
				}
				return;
			}

			const enriched = await Promise.all(
				validEvents.map(async ({ event, parsed }) => {
					const {
						message,
						url,
						commitSha,
						fullRepoName,
						detail: syncDetail,
					} = parsed;

					let detail = syncDetail;

					if (commitSha && fullRepoName) {
						const commitCacheKey = `commit_${commitSha}`;
						const cached = localStorage.getItem(commitCacheKey);
						let requiresFetch = true;

						if (cached) {
							try {
								const parsedCache = JSON.parse(cached);
								if (Date.now() - parsedCache.timestamp < 86400000) {
									detail = parsedCache.payload.commit.message.split('\n')[0];
									requiresFetch = false;
								}
							} catch {
								localStorage.removeItem(commitCacheKey);
							}
						}

						if (requiresFetch) {
							try {
								const commitUrl = `https://api.github.com/repos/${fullRepoName}/commits/${commitSha}`;
								const response = await fetch(commitUrl);
								if (response.ok) {
									const result = await response.json();
									localStorage.setItem(
										commitCacheKey,
										JSON.stringify({
											timestamp: Date.now(),
											payload: result,
										}),
									);
									detail = result.commit.message.split('\n')[0];
								}
							} catch {}
						}
					}

					return {
						id: event.id,
						created_at: event.created_at,
						message,
						url,
						detail,
					};
				}),
			);

			if (isMounted) {
				setActivities(enriched);
				setIsLoading(false);
			}
		};

		processEvents();

		return () => {
			isMounted = false;
		};
	}, [events, error]);

	return { activities, isLoading, error };
}

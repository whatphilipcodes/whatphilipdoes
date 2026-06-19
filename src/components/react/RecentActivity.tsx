import AnchorButton from '@react/AnchorButton';
import { useCachedFetch } from '@react/hooks/useCachedFetch';
import { useEffect, useState } from 'react';

interface RecentActivityProps {
	username: string;
}

interface GitHubEvent {
	id: string;
	type: string;
	created_at: string;
	repo: {
		id: number;
		name: string;
		url: string;
	};
	payload: unknown;
}

interface EnrichedActivity {
	id: string;
	created_at: string;
	message: string;
	url: string;
	commitMessage?: string;
}

const getGitHubResetTime = (response: Response): number | null => {
	const resetHeader = response.headers.get('x-ratelimit-reset');
	if (resetHeader) {
		return parseInt(resetHeader, 10) * 1000;
	}
	return null;
};

export default function RecentActivity({ username }: RecentActivityProps) {
	const url = `https://api.github.com/users/${username}/events/public`;
	const cacheKey = `github_events_${username}`;

	const { data: events, error } = useCachedFetch<GitHubEvent[]>(
		url,
		cacheKey,
		10000,
		{ getResetTimeMs: getGitHubResetTime },
	);

	console.log(events);

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

			const recentActivities = events.slice(0, 3);

			const enriched = await Promise.all(
				recentActivities.map(async (event) => {
					const { message, url, commitSha, fullRepoName } =
						parseGitHubEvent(event);
					let commitMessage: string | undefined;

					if (commitSha && fullRepoName) {
						const commitCacheKey = `commit_${commitSha}`;
						const cached = localStorage.getItem(commitCacheKey);
						let requiresFetch = true;

						if (cached) {
							try {
								const parsedCache = JSON.parse(cached);
								if (Date.now() - parsedCache.timestamp < 86400000) {
									commitMessage =
										parsedCache.payload.commit.message.split('\n')[0];
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
									commitMessage = result.commit.message.split('\n')[0];
								}
							} catch {}
						}
					}

					return {
						id: event.id,
						created_at: event.created_at,
						message,
						url,
						commitMessage,
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

	if (isLoading) return <div>Loading...</div>;
	if (error && activities.length === 0)
		return <div>Failed to load activity.</div>;
	if (activities.length === 0) return <div>No recent activity found.</div>;

	return (
		<div className='relative mb-4 py-4'>
			<ul className='mask-[linear-gradient(to_bottom,black_50%,transparent_98%)] mask-bottom mask-size-[100%_200%] hover:mask-top flex flex-col gap-4 transition-color duration-300'>
				{activities.map((activity) => (
					<li
						key={activity.id}
						className='m-px rounded-md ring ring-mono-200 transition-colors hover:bg-mono-200 hover:ring-transparent dark:ring-mono-900 dark:hover:bg-mono-900'
					>
						<a
							href={activity.url}
							target='_blank'
							rel='noopener noreferrer'
							className='flex flex-col gap-2 px-4 py-3'
						>
							<div className='flex flex-row flex-wrap gap-x-2 text-mono-500'>
								<span>{getTimeAgo(activity.created_at)}</span>
								<span>/</span>
								<span>{activity.message}</span>
							</div>
							{activity.commitMessage && (
								<div>
									<span>{activity.commitMessage}</span>
								</div>
							)}
						</a>
					</li>
				))}
			</ul>
			<a
				href='https://github.com/whatphilipcodes'
				target='_blank'
				rel='noopener noreferrer'
				className='absolute bottom-0 left-1/2 -translate-x-1/2'
			>
				<AnchorButton
					className='bg-mono-50 dark:bg-mono-950'
					text='open github'
				/>
			</a>
		</div>
	);
}

function getTimeAgo(dateString: string): string {
	const now = new Date();
	const past = new Date(dateString);
	const minutes = Math.floor((now.getTime() - past.getTime()) / 1000 / 60);

	if (minutes < 5) return `now`;
	if (minutes < 60) return `${minutes} minutes ago`;

	const hours = Math.floor(minutes / 60);
	if (hours === 1) return '1 hour ago';
	if (hours < 24) return `${hours} hours ago`;

	const days = Math.floor(hours / 24);
	if (days === 1) return '1 day ago';
	return `${days} days ago`;
}

function parseGitHubEvent(event: GitHubEvent) {
	const fullRepoName = event.repo.name;
	const repoName = fullRepoName.replace('whatphilipcodes/', '');
	const baseRepoUrl = `https://github.com/${fullRepoName}`;

	let message = '';
	let url = baseRepoUrl;
	let commitSha: string | undefined;

	switch (event.type) {
		case 'PushEvent': {
			const payload = event.payload as { ref: string; head: string };
			const branch = payload.ref.replace('refs/heads/', '');
			message = `pushed to ${branch} in ${repoName}`;
			url = `${baseRepoUrl}/commit/${payload.head}`;
			commitSha = payload.head;
			break;
		}
		case 'IssuesEvent': {
			const payload = event.payload as {
				action: string;
				issue: { number: number; html_url: string };
			};
			message = `${payload.action} issue #${payload.issue.number} in ${repoName}`;
			url = payload.issue.html_url;
			break;
		}
		case 'IssueCommentEvent': {
			const payload = event.payload as {
				issue: { number: number };
				comment: { html_url: string };
			};
			message = `commented on issue #${payload.issue.number} in ${repoName}`;
			url = payload.comment.html_url;
			break;
		}
		case 'PullRequestEvent': {
			const payload = event.payload as {
				action: string;
				pull_request: { number: number; html_url: string };
			};
			message = `${payload.action} pull request #${payload.pull_request.number} in ${repoName}`;
			url = payload.pull_request.html_url;
			break;
		}
		case 'CreateEvent': {
			const payload = event.payload as { ref_type: string; ref: string | null };
			message = `created ${payload.ref_type} ${payload.ref || ''} in ${repoName}`;
			break;
		}
		case 'WatchEvent':
			message = `starred ${repoName}`;
			break;
		case 'ForkEvent': {
			const payload = event.payload as { forkee: { html_url: string } };
			message = `forked ${repoName}`;
			url = payload.forkee.html_url;
			break;
		}
		default:
			message = `interacted with ${repoName}`;
			break;
	}

	return { message, url, commitSha, fullRepoName };
}

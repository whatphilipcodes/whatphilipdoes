import { useCachedFetch } from '@react/hooks/useCachedFetch';

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

const getGitHubResetTime = (response: Response): number | null => {
	const resetHeader = response.headers.get('x-ratelimit-reset');
	if (resetHeader) {
		return parseInt(resetHeader, 10) * 1000;
	}
	return null;
};

function CommitMessage({
	fullRepoName,
	sha,
}: {
	fullRepoName: string;
	sha: string;
}) {
	const url = `https://api.github.com/repos/${fullRepoName}/commits/${sha}`;
	const cacheKey = `commit_${sha}`;

	const { data, loading, error } = useCachedFetch<{
		commit: { message: string };
	}>(url, cacheKey, 86400000);

	if (loading && !data)
		return (
			<span>
				{' '}
				- <em>Loading message...</em>
			</span>
		);

	if (error && !data) return null;

	const firstLine = data?.commit.message.split('\n')[0];
	return <span className='text-mono-500'>{firstLine}</span>;
}

export default function RecentActivity({ username }: RecentActivityProps) {
	const url = `https://api.github.com/users/${username}/events/public`;
	const cacheKey = `github_events_${username}`;

	const { data, loading, error } = useCachedFetch<GitHubEvent[]>(
		url,
		cacheKey,
		10000,
		{ getResetTimeMs: getGitHubResetTime },
	);

	if (error && !data) return <div>Failed to load activity.</div>;
	if (loading && !data) return <div>Loading...</div>;
	if (!data || data.length === 0) return <div>No recent activity found.</div>;

	const recentActivities = data.slice(0, 3);

	return (
		<ul className='mask-[linear-gradient(to_bottom,black_33%,transparent_100%)] flex flex-col gap-4 py-4'>
			{recentActivities.map((event) => {
				const { message, url, commitSha, fullRepoName } =
					parseGitHubEvent(event);
				const timeAgo = getTimeAgo(event.created_at);

				return (
					<li
						key={event.id}
						className='rounded-md border border-mono-200 dark:border-mono-900'
					>
						<a
							href={url}
							target='_blank'
							rel='noopener noreferrer'
							className='block p-4'
						>
							<div className='text-mono-500'>{timeAgo}</div>
							<div className='flex flex-row gap-4'>
								{message}
								{commitSha && fullRepoName && (
									<CommitMessage fullRepoName={fullRepoName} sha={commitSha} />
								)}
							</div>
						</a>
					</li>
				);
			})}
		</ul>
	);
}

function getTimeAgo(dateString: string): string {
	const now = new Date();
	const past = new Date(dateString);
	const minutes = Math.floor((now.getTime() - past.getTime()) / 1000 / 60);

	if (minutes < 2) return `now`;
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

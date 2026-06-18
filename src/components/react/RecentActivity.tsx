import useFetch from '@react/hooks/useFetch';
import { useEffect } from 'react';

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

function CommitMessage({
	fullRepoName,
	sha,
}: {
	fullRepoName: string;
	sha: string;
}) {
	const url = `https://api.github.com/repos/${fullRepoName}/commits/${sha}`;

	const { data, loading, error } = useFetch<{ commit: { message: string } }>(
		url,
		{ method: 'GET', headers: { 'Content-Type': 'application/json' } },
	);

	if (loading)
		return (
			<span>
				{' '}
				- <em>Loading message...</em>
			</span>
		);
	if (error || !data) return null;

	const firstLine = data.commit.message.split('\n')[0];
	return <span className='text-mono-500'>{firstLine}</span>;
}

export default function RecentActivity({ username }: RecentActivityProps) {
	const url = `https://api.github.com/users/${username}/events/public`;

	const { data, loading, error } = useFetch<GitHubEvent[]>(
		url,
		{ method: 'GET', headers: { 'Content-Type': 'application/json' } },
		60000,
	);

	useEffect(() => {
		if (error) {
			console.error('Fetch Error:', error);
		}
	}, [error]);

	if (error) return <div>Failed to load activity.</div>;
	if (loading && !data) return <div>Loading...</div>;
	if (!data || data.length === 0) return <div>No recent activity found.</div>;

	const recentActivities = data.slice(0, 3);

	return (
		<ul className='flex flex-col gap-4 py-4'>
			{recentActivities.map((event) => {
				const { message, url, commitSha, fullRepoName } =
					parseGitHubEvent(event);
				const timeAgo = getTimeAgo(event.created_at);

				return (
					<li
						key={event.id}
						className='rounded-md p-4 ring ring-mono-200 dark:ring-mono-900'
					>
						<a href={url} target='_blank' rel='noopener noreferrer'>
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
	if (hours < 24) return `${hours} hours ago`;
	const days = Math.floor(hours / 24);
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

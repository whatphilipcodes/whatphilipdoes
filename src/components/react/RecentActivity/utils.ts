import { DateTime } from 'luxon';
import type { GitHubEvent } from './types';

export const getGitHubResetTime = (response: Response): number | null => {
	const resetHeader = response.headers.get('x-ratelimit-reset');
	if (resetHeader) {
		return parseInt(resetHeader, 10) * 1000;
	}
	return null;
};

export function getTimeAgo(dateString: string): string {
	const date = DateTime.fromISO(dateString).setLocale('en-US');
	return date.isValid && DateTime.now().diff(date, 'minutes').minutes < 2
		? 'now'
		: (date.toRelative() ?? '');
}

export function parseGitHubEvent(event: GitHubEvent) {
	const fullRepoName = event.repo.name;
	const repoName = fullRepoName.replace('whatphilipcodes/', '');
	const baseRepoUrl = `https://github.com/${fullRepoName}`;

	let message = '';
	let detail = '';
	let url = baseRepoUrl;
	let commitSha: string | undefined;

	switch (event.type) {
		case 'PushEvent': {
			const branch = event.payload.ref.replace('refs/heads/', '');
			message = `pushed to ${branch} in ${repoName}`;
			url = `${baseRepoUrl}/commit/${event.payload.head}`;
			commitSha = event.payload.head;
			detail = 'Fetching commit details...';
			break;
		}
		case 'IssuesEvent': {
			message = `${event.payload.action} issue #${event.payload.issue.number} in ${repoName}`;
			url = event.payload.issue.html_url;
			if (event.payload.action === 'labeled' && event.payload.label) {
				detail = event.payload.label.name;
			} else if (
				event.payload.action === 'assigned' &&
				event.payload.assignee
			) {
				detail = event.payload.assignee.login;
			} else {
				detail = event.payload.issue.title;
			}
			break;
		}
		case 'IssueCommentEvent': {
			message = `commented on issue #${event.payload.issue.number} in ${repoName}`;
			url = event.payload.comment.html_url;
			detail = event.payload.comment.body;
			break;
		}
		case 'PullRequestEvent': {
			message = `${event.payload.action} pull request #${event.payload.pull_request.number} in ${repoName}`;
			url = event.payload.pull_request.html_url;
			detail = event.payload.pull_request.title;
			break;
		}
		case 'PullRequestReviewEvent': {
			message = `${event.payload.action} review on PR #${event.payload.pull_request.number} in ${repoName}`;
			url = event.payload.review.html_url;
			detail = event.payload.review.body || event.payload.pull_request.title;
			break;
		}
		case 'CreateEvent': {
			message =
				`created ${event.payload.ref_type} ${event.payload.ref || ''} in ${repoName}`.trim();
			detail = event.payload.description || event.payload.ref_type;
			break;
		}
		case 'ReleaseEvent': {
			message = `${event.payload.action} release in ${repoName}`;
			url = event.payload.release.html_url;
			detail = event.payload.release.name || event.payload.release.tag_name;
			break;
		}
		case 'ForkEvent': {
			message = `forked ${repoName}`;
			url = event.payload.forkee.html_url;
			detail = `Forked to ${event.payload.forkee.full_name}`;
			break;
		}
		default:
			return null;
	}

	return { message, url, commitSha, fullRepoName, detail };
}

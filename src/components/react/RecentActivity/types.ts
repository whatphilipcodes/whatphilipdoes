export interface BaseGitHubEvent<TType extends string, TPayload> {
	id: string;
	type: TType;
	created_at: string;
	repo: {
		id: number;
		name: string;
		url: string;
	};
	payload: TPayload;
}

export type GitHubEvent =
	| BaseGitHubEvent<'PushEvent', { ref: string; head: string }>
	| BaseGitHubEvent<
			'IssuesEvent',
			{
				action: string;
				issue: { number: number; html_url: string; title: string };
				label?: { name: string };
				assignee?: { login: string };
			}
	  >
	| BaseGitHubEvent<
			'IssueCommentEvent',
			{
				issue: { number: number };
				comment: { html_url: string; body: string };
			}
	  >
	| BaseGitHubEvent<
			'PullRequestEvent',
			{
				action: string;
				pull_request: { number: number; html_url: string; title: string };
			}
	  >
	| BaseGitHubEvent<
			'PullRequestReviewEvent',
			{
				action: string;
				pull_request: { number: number; title: string };
				review: { html_url: string; body: string };
			}
	  >
	| BaseGitHubEvent<
			'CreateEvent',
			{ ref_type: string; ref: string | null; description?: string }
	  >
	| BaseGitHubEvent<'DeleteEvent', { ref_type: string; ref: string }>
	| BaseGitHubEvent<
			'ReleaseEvent',
			{
				action: string;
				release: { html_url: string; name: string; tag_name: string };
			}
	  >
	| BaseGitHubEvent<'PublicEvent', Record<string, never>>
	| BaseGitHubEvent<'WatchEvent', Record<string, never>>
	| BaseGitHubEvent<
			'ForkEvent',
			{ forkee: { html_url: string; full_name: string } }
	  >;

export interface RecentActivityProps {
	username: string;
}

export interface EnrichedActivity {
	id: string;
	created_at: string;
	message: string;
	url: string;
	detail: string;
}

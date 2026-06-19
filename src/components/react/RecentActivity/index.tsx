import AnchorButton from '@react/AnchorButton';
import type { RecentActivityProps } from './types';
import { useGitHubActivity } from './useGithubActivity';
import { getTimeAgo } from './utils';

function ActivitySkeleton() {
	return (
		<li className='m-px rounded-md ring ring-mono-200 dark:ring-mono-900'>
			<div className='flex h-18 flex-col justify-center rounded-xl px-4 py-3'>
				<div className='flex flex-row flex-nowrap items-center gap-x-2'>
					<div className='h-4 w-12 animate-pulse rounded bg-mono-200 dark:bg-mono-800'></div>
					<span className='shrink-0 text-mono-500'>/</span>
					<div className='h-4 w-48 animate-pulse rounded bg-mono-200 dark:bg-mono-800'></div>
				</div>
				<div className='mt-2 h-4 w-3/4 animate-pulse rounded bg-mono-100 dark:bg-mono-900'></div>
			</div>
		</li>
	);
}

export default function RecentActivity({ username }: RecentActivityProps) {
	const SKELETON_KEYS = ['skeleton-1', 'skeleton-2', 'skeleton-3'];
	const { activities, isLoading, error } = useGitHubActivity(username);

	if (error && !isLoading && activities.length === 0) {
		return <div>Failed to load activity.</div>;
	}

	if (!isLoading && activities.length === 0) {
		return <div>No recent activity found.</div>;
	}

	return (
		<div className='relative mb-4 py-4'>
			<ul className='mask-[linear-gradient(to_bottom,black_50%,transparent_98%)] mask-bottom mask-size-[100%_200%] hover:mask-top flex flex-col gap-4 transition-color duration-300'>
				{isLoading
					? Array.from({ length: 3 }).map((_, index) => (
							<ActivitySkeleton key={SKELETON_KEYS[index]} />
						))
					: activities.map((activity) => (
							<li
								key={activity.id}
								className='m-px rounded-md ring ring-mono-200 transition-colors hover:bg-mono-200 hover:ring-transparent dark:ring-mono-900 dark:hover:bg-mono-900'
							>
								<a
									href={activity.url}
									target='_blank'
									rel='noopener noreferrer'
									className='focus-visible:accessible flex h-18 flex-col justify-center rounded-lg px-4 py-3 focus-visible:-outline-offset-6'
								>
									<div className='flex flex-row flex-nowrap items-center gap-x-2 text-mono-500'>
										<span className='shrink-0'>
											{getTimeAgo(activity.created_at)}
										</span>
										<span className='shrink-0'>/</span>
										<span className='truncate'>{activity.message}</span>
									</div>
									<div className='truncate text-mono-950 dark:text-mono-50'>
										{activity.detail || '\u00A0'}
									</div>
								</a>
							</li>
						))}
			</ul>
			<a
				href={`https://github.com/${username}`}
				target='_blank'
				rel='noopener noreferrer'
				className='group absolute bottom-0 left-1/2 -translate-x-1/2 focus-visible:outline-none'
			>
				<AnchorButton
					className='bg-mono-50 dark:bg-mono-950'
					text='see profile'
				/>
			</a>
		</div>
	);
}

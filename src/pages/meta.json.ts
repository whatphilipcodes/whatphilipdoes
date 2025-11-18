import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
	const preloadMediaCount = 5; // any better way to make this dynamic?

	return new Response(
		JSON.stringify({
			preloadMediaCount,
		}),
		{
			status: 200,
			headers: {
				'Content-Type': 'application/json',
			},
		},
	);
};

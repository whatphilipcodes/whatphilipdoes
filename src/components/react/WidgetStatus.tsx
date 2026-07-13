import { z } from 'astro/zod';
import { useEffect, useState } from 'react';

const timeRegex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;

const propsSchema = z.object({
	timezone: z.string().refine(
		(val) => {
			try {
				new Intl.DateTimeFormat('en-US', { timeZone: val });
				return true;
			} catch {
				return false;
			}
		},
		{ message: 'Invalid IANA timezone' },
	),
	location: z.string().min(1),
	timeStart: z.string().regex(timeRegex, 'Must be HH:MM:SS'),
	timeEnd: z.string().regex(timeRegex, 'Must be HH:MM:SS'),
	holiday: z.coerce.date().optional(),
});

type WidgetStatusProps = z.infer<typeof propsSchema>;

export default function WidgetStatus({
	timezone,
	location,
	timeStart,
	timeEnd,
	holiday,
}: WidgetStatusProps) {
	const [isOnline, setIsOnline] = useState<boolean>(false);
	const [time, setTime] = useState<string>('00:00:00');
	const [date, setDate] = useState<string>('1970-01-01');
	const [status, setStatus] = useState<string>('loading');

	useEffect(() => {
		const validationResult = propsSchema.safeParse({
			timezone,
			location,
			timeStart,
			timeEnd,
			holiday,
		});

		if (!validationResult.success) {
			console.error('WidgetStatus validation failed:', validationResult.error);
			setStatus('error');
			return;
		}

		const formatterTime = new Intl.DateTimeFormat('en-US', {
			timeZone: timezone,
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
			hour12: false,
		});

		const formatterDate = new Intl.DateTimeFormat('en-CA', {
			timeZone: timezone,
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
		});

		const updateClock = () => {
			const now = new Date();
			const currentTimeString = formatterTime.format(now);

			setTime(currentTimeString);
			setDate(formatterDate.format(now));

			if (currentTimeString >= timeStart && currentTimeString <= timeEnd) {
				setIsOnline(true);
				setStatus('online');
			} else {
				setIsOnline(false);
				setStatus('offline');
			}
		};

		updateClock();
		const intervalId = setInterval(updateClock, 1000);

		return () => clearInterval(intervalId);
	}, [timezone, location, timeStart, timeEnd, holiday]);

	return (
		<div className='flex w-fit flex-row flex-wrap gap-2 md:gap-4'>
			<div className='flex items-center gap-2 rounded-md border border-mono-900 px-2'>
				<span>{location}</span>
			</div>
			<div className='flex items-center gap-2 rounded-md border border-mono-900 px-2 font-mono'>
				<span>{date}</span>
				<span>{time}</span>
			</div>
			<div className='flex items-center gap-2 rounded-md border border-mono-900 px-2'>
				<svg
					className={`h-3 w-3 fill-current ${isOnline ? 'text-prim-500' : 'text-mono-500'}`}
					viewBox='0 0 100 100'
					xmlns='http://www.w3.org/2000/svg'
				>
					<title>status-icon</title>
					<circle cx='50' cy='50' r='36' />
				</svg>
				<span>{status}</span>
			</div>
		</div>
	);
}

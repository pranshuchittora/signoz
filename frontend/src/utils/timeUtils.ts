import dayjs from 'dayjs';
import relativeTimePlugin from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTimePlugin);

export const relativeTimeString = (time): string => {
	return dayjs(time).fromNow();
};
export const toUTCEpoch = (time: number): number => {
	const x = new Date();
	return time + x.getTimezoneOffset() * 60 * 1000;
};

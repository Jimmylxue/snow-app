import dayjs from 'dayjs';

export function baseFormatTime(time: string) {
  return dayjs(time).format('YYYY-MM-DD HH:mm:ss');
}

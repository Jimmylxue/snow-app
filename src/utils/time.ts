import dayjs from 'dayjs';

export function baseFormatTime(time: string, fullTime: boolean = true) {
  return dayjs(time).format(fullTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD');
}

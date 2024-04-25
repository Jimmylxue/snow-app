import { QueryKey, UseQueryOptions, useQuery } from 'react-query';
import { ClientError, getWithOutHeader, post } from './client';

export function useSmsList(
  queryKey: QueryKey,
  variable: {},
  config?: UseQueryOptions<string[], ClientError>,
) {
  return useQuery<string[], ClientError>(
    queryKey,
    () => getWithOutHeader('/random_sms/'),
    config,
  );
}

export function useSmsCheck(
  queryKey: QueryKey,
  variable: { text: string },
  config?: UseQueryOptions<{ is_spam: string }, ClientError>,
) {
  return useQuery<{ is_spam: string }, ClientError>(
    queryKey,
    () => post('/classify_sms/', variable),
    config,
  );
}

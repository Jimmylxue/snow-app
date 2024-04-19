import {
  QueryKey,
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
} from 'react-query';
import { ClientError, post } from './client';
import { TUserLetter } from '../navigation/navigation';

export enum EReadStatus {
  未读 = 1,
  已读,
}

export function useUserLetter(
  queryKey: QueryKey,
  variable: {
    platform: number;
  },
  config?: UseQueryOptions<TUserLetter[], ClientError>,
) {
  return useQuery<TUserLetter[], ClientError>(
    queryKey,
    () => post('/letter/user/record', variable),
    config,
  );
}

export function useReadLetter(
  options?: UseMutationOptions<
    boolean,
    ClientError,
    {
      recordId: number;
      status: EReadStatus;
    }
  >,
) {
  return useMutation<
    boolean,
    ClientError,
    {
      recordId: number;
      status: EReadStatus;
    }
  >(data => post('/letter/user/read', data), options);
}

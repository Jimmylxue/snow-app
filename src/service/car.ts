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

export function useBindCar(
  options?: UseMutationOptions<
    boolean,
    ClientError,
    {
      carAddr: string;
      carCharacter: string;
      carNumber: string;
      carType: string;
      carWeight: string;
    }
  >,
) {
  return useMutation<
    boolean,
    ClientError,
    {
      carAddr: string;
      carCharacter: string;
      carNumber: string;
      carType: string;
      carWeight: string;
    }
  >(data => post('/bindCar', data), options);
}

export function useSubmitOrder(
  options?: UseMutationOptions<
    boolean,
    ClientError,
    {
      cargoRequirement: {
        endAddr: string;
        handlingRequirement: string;
        startAddr: string;
        timeValid: number;
        type: string;
        weight: number;
      };
      order: {
        addr: string;
        consignee: string;
        // logistics_information: string;
        phone: string;
      };
    }
  >,
) {
  return useMutation<
    boolean,
    ClientError,
    {
      cargoRequirement: {
        endAddr: string;
        handlingRequirement: string;
        startAddr: string;
        timeValid: number;
        type: string;
        weight: number;
      };
      order: {
        addr: string;
        consignee: string;
        // logistics_information: string;
        phone: string;
      };
    }
  >(data => post('/submitOrderDetails', data), options);
}

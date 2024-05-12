import {
  QueryKey,
  UseInfiniteQueryOptions,
  UseMutationOptions,
  UseQueryOptions,
  useInfiniteQuery,
  useMutation,
  useQuery,
} from 'react-query';
import { ClientError, get, post } from './client';
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

type TAddCarItem = {
  carAddr: string;
  carCharacter: string;
  carNumber: string;
  carType: string;
  carWeight: string;
};

type TUpdateCar = TAddCarItem & {
  id: number;
};

/**
 * 获取司机车子信息
 */
export function useCarMessage(
  queryKey: QueryKey,
  variable: {},
  config?: UseQueryOptions<TUpdateCar[], ClientError>,
) {
  return useQuery<TUpdateCar[], ClientError>(
    queryKey,
    () => post('/getCar', variable),
    config,
  );
}

export function useBindCar(
  options?: UseMutationOptions<boolean, ClientError, TAddCarItem>,
) {
  return useMutation<boolean, ClientError, TAddCarItem>(
    data => post('/bindCar', data),
    options,
  );
}

export function useUpdateCar(
  options?: UseMutationOptions<boolean, ClientError, TUpdateCar>,
) {
  return useMutation<boolean, ClientError, TUpdateCar>(
    data => post('/updateCar', data),
    options,
  );
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
        logisticsInformation: string;
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
        logisticsInformation: string;
        // logistics_information: string;
        phone: string;
      };
    }
  >(data => post('/submitOrderDetails', data), options);
}

export type TBaseOrder = {
  result: {};
  total: number;
};

export function useOrderList(
  queryKey: QueryKey,
  variables: {
    current: number;
    size: number;
  },
  queryConfig?: UseInfiniteQueryOptions<TBaseOrder, ClientError>,
) {
  return useInfiniteQuery<TBaseOrder, ClientError>(
    queryKey,
    async ({ pageParam = 1 }) =>
      get('/order/page', {
        ...variables,
        current: pageParam,
      }),
    {
      ...queryConfig,
      getNextPageParam: (last, all) => {
        const hasNext = variables.size * all.length < last.total;
        if (hasNext) {
          return all.length + 1;
        }
        return false;
      },
    },
  );
}

type TOrderDetail = {};

export function useOrderDetail(
  queryKey: QueryKey,
  variable: {
    orderId: number;
  },
  config?: UseQueryOptions<TOrderDetail, ClientError>,
) {
  return useQuery<TOrderDetail, ClientError>(
    queryKey,
    () => post('/cargoRequirementByorderId', variable),
    config,
  );
}

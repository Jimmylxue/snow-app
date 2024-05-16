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
  addr: string;
  id: number;
  consignee: string;
  logisticsInformation: string;
  phone: string;
  userId: string;
  orderId: string;
  /** 1表示已匹配 */
  orderStatus: number;
};

type TBaseOrderResult = {
  records: TBaseOrder[];
  total: number;
};

export function useOrderList(
  queryKey: QueryKey,
  variables: {
    current: number;
    size: number;
  },
  queryConfig?: UseInfiniteQueryOptions<TBaseOrderResult, ClientError>,
) {
  return useInfiniteQuery<TBaseOrderResult, ClientError>(
    queryKey,
    async ({ pageParam = 1 }) =>
      get('/order/page', {
        ...variables,
        current: pageParam,
      }),
    {
      ...queryConfig,
      getNextPageParam: (last, all) => {
        const lastLength = last?.records?.length || 0;
        const hasNext = lastLength !== 0;
        if (hasNext) {
          console.log('dddd', all.length + 1);
          return all.length + 1;
        }
        return;
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

type TMatchItem = {
  carAddr: string;
  carCharacter: string;
  carNumber: string;
  carType: string;
  carWeight: number;
  id: number;
  score: number;
  userId: number;
};

/**
 * 查看可匹配的车子
 */
export function useMatchCarList(
  queryKey: QueryKey,
  variable: {
    orderId: string;
  },
  config?: UseQueryOptions<TMatchItem[], ClientError>,
) {
  return useQuery<TMatchItem[], ClientError>(
    queryKey,
    () => get('/match', variable),
    config,
  );
}

type TSubmitParams = {
  carId: number;
  carUserId: number;
  orderId: string;
};

/**
 * 提交匹配的车子
 */
export function useSubmitMatch(
  options?: UseMutationOptions<boolean, ClientError, TSubmitParams>,
) {
  return useMutation<boolean, ClientError, TSubmitParams>(
    data => get('/car/submit', data),
    options,
  );
}

export type TMatchOrderItem = {
  consumerUserId: number;
  consumerUsername: string;
  driverUserId: number;
  driverUsername: string;
  id: number;
  money: number;
  orderId: number;
  orderStatus: number;
};

/**
 * 查看匹配上的订单
 */
export function useMatchOrderList(
  queryKey: QueryKey,
  variable: any,
  config?: UseQueryOptions<TMatchOrderItem[], ClientError>,
) {
  return useQuery<TMatchOrderItem[], ClientError>(
    queryKey,
    () => get('/car/list', variable),
    config,
  );
}

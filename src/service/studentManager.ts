import {
  QueryKey,
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
} from 'react-query';
import { ClientError, post } from './client';
import { TUser } from './login';

export enum EReadStatus {
  未读 = 1,
  已读,
}

/**
 * 上报经纬度
 */
export function useReportPosition(
  options?: UseMutationOptions<
    boolean,
    ClientError,
    {
      latitude: string;
      longitude: string;
    }
  >,
) {
  return useMutation<
    boolean,
    ClientError,
    {
      latitude: string;
      longitude: string;
    }
  >(data => post('/userGeo/add', data), options);
}

export type TSleepTime = {
  disabledStartHour: number;
  disabledEndHour: number;
};

/**
 * 获取睡眠时间
 */
export function useSleepTime(
  queryKey: QueryKey,
  variable: {},
  config?: UseQueryOptions<TSleepTime, ClientError>,
) {
  return useQuery<TSleepTime, ClientError>(
    queryKey,
    () => post('/managerSetting/info', variable),
    config,
  );
}

/**
 * 更改时间配置
 */
export function useUpdateSleepTime(
  options?: UseMutationOptions<boolean, ClientError, TSleepTime>,
) {
  return useMutation<boolean, ClientError, TSleepTime>(
    data => post('/managerSetting/save', data),
    options,
  );
}

type TChildren = {
  children: TUser;
  createTime: string;
  id: number;
  updateTime: string;
  childrenId: number;
  parentId: number;
};

/**
 * 获取绑定孩子列表
 */
export function useChildList(
  queryKey: QueryKey,
  variable: {},
  config?: UseQueryOptions<TChildren[], ClientError>,
) {
  return useQuery<TChildren[], ClientError>(
    queryKey,
    () => post('/childrenRecord/list', variable),
    config,
  );
}

/**
 * 绑定孩子
 */
export function useBindChild(
  options?: UseMutationOptions<boolean, ClientError, { phone: string }>,
) {
  return useMutation<boolean, ClientError, { phone: string }>(
    data => post('/childrenRecord/add', data),
    options,
  );
}

/**
 * 解绑孩子
 */
export function useUnBindChild(
  options?: UseMutationOptions<boolean, ClientError, { childrenId: number }>,
) {
  return useMutation<boolean, ClientError, { childrenId: number }>(
    data => post('/childrenRecord/remove', data),
    options,
  );
}

/**
 * 获取绑定家长
 */
export function useParentList(
  queryKey: QueryKey,
  variable: {},
  config?: UseQueryOptions<TUser, ClientError>,
) {
  return useQuery<TUser, ClientError>(
    queryKey,
    () => post('/childrenRecord/getParent', variable),
    config,
  );
}

type TPositionInfo = {
  formatted_address: string;
  latitude: string;
  longitude: string;
  id: number;
  createdTime: string;
};

/**
 * 获取位置信息记录
 */
export function useChildrenPositionList(
  queryKey: QueryKey,
  variable: {
    userId: number;
  },
  config?: UseQueryOptions<TPositionInfo[], ClientError>,
) {
  return useQuery<TPositionInfo[], ClientError>(
    queryKey,
    () => post('/userGeo/list', variable),
    config,
  );
}

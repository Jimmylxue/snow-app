import {
  QueryKey,
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
} from 'react-query';
import { ClientError, post } from './client';

type TAddCourseType = {
  name: string;
  desc: string;
};

/**
 * 创建课程
 */
export function useAddCourseType(
  options?: UseMutationOptions<boolean, ClientError, TAddCourseType>,
) {
  return useMutation<boolean, ClientError, TAddCourseType>(
    data => post('/course/addType', data),
    options,
  );
}

type TEditCourseType = TAddCourseType & {
  id: number;
};

/**
 * 创建课程
 */
export function useEditCourseType(
  options?: UseMutationOptions<boolean, ClientError, TEditCourseType>,
) {
  return useMutation<boolean, ClientError, TEditCourseType>(
    data => post('/course/editType', data),
    options,
  );
}

export type TCourseType = {
  id: number;
  name: string;
  desc: string;
  createTime: string;
};

/**
 * 获取所有的课程类型
 */
export function useCourseType(
  queryKey: QueryKey,
  variable: {},
  config?: UseQueryOptions<TCourseType[], ClientError>,
) {
  return useQuery<TCourseType[], ClientError>(
    queryKey,
    () => post('/course/listType', variable),
    config,
  );
}

/**
 * 创建课程
 */
export function useDelCourseType(
  options?: UseMutationOptions<boolean, ClientError, { id: number }>,
) {
  return useMutation<boolean, ClientError, { id: number }>(
    data => post('/course/delType', data),
    options,
  );
}

type TAddCourseParams = {
  name: string;
  desc: string;
  typeId: number;
  cover: string;
  source: string;
};

/**
 * 创建课程
 */
export function useAddCourse(
  options?: UseMutationOptions<boolean, ClientError, TAddCourseParams>,
) {
  return useMutation<boolean, ClientError, TAddCourseParams>(
    data => post('/course/addCourse', data),
    options,
  );
}

export type TCourseItem = TAddCourseParams & {
  id: number;
  createTime: string;
};

/**
 * 查看类型下的视频
 */
export function useTypeCourse(
  queryKey: QueryKey,
  variable: {
    typeId: number;
  },
  config?: UseQueryOptions<TCourseItem[], ClientError>,
) {
  return useQuery<TCourseItem[], ClientError>(
    queryKey,
    () => post('/course/listCourse', variable),
    config,
  );
}

export function useDelCourse(
  options?: UseMutationOptions<boolean, ClientError, { id: number }>,
) {
  return useMutation<boolean, ClientError, { id: number }>(
    data => post('/course/delCourse', data),
    options,
  );
}

export function useEditCourse(
  options?: UseMutationOptions<
    boolean,
    ClientError,
    { id: number; name: string; desc: string; cover: string; source: string }
  >,
) {
  return useMutation<
    boolean,
    ClientError,
    { id: number; name: string; desc: string; cover: string; source: string }
  >(data => post('/course/editCourse', data), options);
}

/**
 * 获取随机视频
 */
export function useRandomCourse(
  queryKey: QueryKey,
  variable: {
    typeId?: number;
  },
  config?: UseQueryOptions<TCourseItem[], ClientError>,
) {
  return useQuery<TCourseItem[], ClientError>(
    queryKey,
    () => post('/course/randomCourse', variable),
    config,
  );
}

type TCourseOrder = {
  id: number;
  course: TCourseItem;
};

/**
 * 获取购买的课程
 */
export function useUserBuyCourse(
  queryKey: QueryKey,
  variable: {},
  config?: UseQueryOptions<TCourseOrder[], ClientError>,
) {
  return useQuery<TCourseOrder[], ClientError>(
    queryKey,
    () => post('/course/courseOrder', variable),
    config,
  );
}

/**
 * 查看是否购买该课程
 */
export function useCheckBuy(
  queryKey: QueryKey,
  variable: { courseId: number },
  config?: UseQueryOptions<boolean, ClientError>,
) {
  return useQuery<boolean, ClientError>(
    queryKey,
    () => post('/course/checkBuy', variable),
    config,
  );
}

export function useBuyCourse(
  options?: UseMutationOptions<boolean, ClientError, { courseId: number }>,
) {
  return useMutation<boolean, ClientError, { courseId: number }>(
    data => post('/course/buyCourse', data),
    options,
  );
}

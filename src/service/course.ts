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

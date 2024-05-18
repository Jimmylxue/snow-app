import {
  QueryKey,
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
} from 'react-query';
import { ClientError, post } from './client';

export type TExamType = {
  id: number;
  name: string;
  desc: string;
  createTime: string;
};

/**
 * 获取所有的考试类型
 */
export function useExamType(
  queryKey: QueryKey,
  variable: {},
  config?: UseQueryOptions<TExamType[], ClientError>,
) {
  return useQuery<TExamType[], ClientError>(
    queryKey,
    () => post('/question/listType', variable),
    config,
  );
}

type TAddExamType = {
  name: string;
  desc: string;
};

/**
 * 创建题目
 */
export function useAddExamType(
  options?: UseMutationOptions<boolean, ClientError, TAddExamType>,
) {
  return useMutation<boolean, ClientError, TAddExamType>(
    data => post('/question/addType', data),
    options,
  );
}

type TEditExamType = TAddExamType & {
  id: number;
};

/**
 * 创建课程
 */
export function useEditExamType(
  options?: UseMutationOptions<boolean, ClientError, TEditExamType>,
) {
  return useMutation<boolean, ClientError, TEditExamType>(
    data => post('/question/editType', data),
    options,
  );
}

export function useDelExamType(
  options?: UseMutationOptions<boolean, ClientError, { id: number }>,
) {
  return useMutation<boolean, ClientError, { id: number }>(
    data => post('/question/delType', data),
    options,
  );
}

export enum EExamType {
  选择题 = 1,
  判断题,
}

type TAddExamParams = {
  typeId: number;
  name: string;
  desc: string;
  examType: EExamType;
  option: string;
  answer: string;
};

/**
 * 创建课程
 */
export function useAddExam(
  options?: UseMutationOptions<boolean, ClientError, TAddExamParams>,
) {
  return useMutation<boolean, ClientError, TAddExamParams>(
    data => post('/question/addQuestion', data),
    options,
  );
}

/**
 * 查看类型下的题目
 */
export function useTypeExam(
  queryKey: QueryKey,
  variable: {
    typeId: number;
  },
  config?: UseQueryOptions<TExamItem[], ClientError>,
) {
  return useQuery<TExamItem[], ClientError>(
    queryKey,
    () => post('/question/listQuestion', variable),
    config,
  );
}

export type TExamItem = TAddExamParams & {
  id: number;
};

export function useDelExamQuestion(
  options?: UseMutationOptions<boolean, ClientError, { id: number }>,
) {
  return useMutation<boolean, ClientError, { id: number }>(
    data => post('/question/delQuestion', data),
    options,
  );
}

export function useEditExamQuestion(
  options?: UseMutationOptions<
    boolean,
    ClientError,
    { id: number; name: string; desc: string }
  >,
) {
  return useMutation<
    boolean,
    ClientError,
    { id: number; name: string; desc: string }
  >(data => post('/question/editQuestion', data), options);
}

/**
 * 获取随机题目
 */
export function useRandomQuestion(
  queryKey: QueryKey,
  variable: {
    typeId?: number;
  },
  config?: UseQueryOptions<TExamItem[], ClientError>,
) {
  return useQuery<TExamItem[], ClientError>(
    queryKey,
    () => post('/question/randomQuestion', variable),
    config,
  );
}

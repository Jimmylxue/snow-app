import {
  QueryKey,
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
} from 'react-query';
import { ClientError, post } from './client';

type TClub = {
  clubId: number;
  name: string;
  desc: string;
  createdTime: string;
  updateTime: string;
};

type TMineClub = {
  id: number;
  createdTime: string;
  updateTime: string;
  clubId: number;
  club: TClub;
};

/**
 * 获取所有的社团
 */
export function useAllClub(
  queryKey: QueryKey,
  variable: {},
  config?: UseQueryOptions<TClub[], ClientError>,
) {
  return useQuery<TClub[], ClientError>(
    queryKey,
    () => post('/club/allList', variable),
    config,
  );
}

/**
 * 获取用户的社团
 */
export function useUserClub(
  queryKey: QueryKey,
  variable: {},
  config?: UseQueryOptions<TMineClub[], ClientError>,
) {
  return useQuery<TMineClub[], ClientError>(
    queryKey,
    () => post('/club/list', variable),
    config,
  );
}

/**
 * 创建社团
 */
export function useAddClub(
  options?: UseMutationOptions<
    boolean,
    ClientError,
    {
      name: string;
      desc: string;
    }
  >,
) {
  return useMutation<
    boolean,
    ClientError,
    {
      name: string;
      desc: string;
    }
  >(data => post('/club/add', data), options);
}

/**
 * 用户加入社团
 */
export function useJoinClub(
  options?: UseMutationOptions<
    boolean,
    ClientError,
    {
      clubId: number;
    }
  >,
) {
  return useMutation<
    boolean,
    ClientError,
    {
      clubId: number;
    }
  >(data => post('/club/signUp', data), options);
}

type TActivityItem = {
  clubActivityId: number;
  clubId: number;
  name: string;
  desc: string;
  signStartTime: number;
  signEndTime: number;
  createdTime: string;
};

/**
 * 查看社团活动
 */
export function useClubActivity(
  queryKey: QueryKey,
  variable: {
    clubId: number;
  },
  config?: UseQueryOptions<TActivityItem[], ClientError>,
) {
  return useQuery<TActivityItem[], ClientError>(
    queryKey,
    () => post('/cactivity/list', variable),
    config,
  );
}

/**
 * 用户加入社团活动
 */
export function useJoinActivity(
  options?: UseMutationOptions<
    boolean,
    ClientError,
    {
      clubActivityId: number;
    }
  >,
) {
  return useMutation<
    boolean,
    ClientError,
    {
      clubActivityId: number;
    }
  >(data => post('/cactivity/signUp', data), options);
}

/**
 * 发起投票
 */
export function useLaunchVote(
  options?: UseMutationOptions<
    boolean,
    ClientError,
    {
      clubId: number;
      name: string;
      desc: string;
    }
  >,
) {
  return useMutation<
    boolean,
    ClientError,
    {
      clubId: number;
      name: string;
      desc: string;
    }
  >(data => post('/vote/launch', data), options);
}

/**
 * 发布活动
 */
export function useAddActivity(
  options?: UseMutationOptions<
    boolean,
    ClientError,
    {
      clubId: number;
      name: string;
      desc: string;
      signStartTime: number;
      signEndTime: number;
    }
  >,
) {
  return useMutation<
    boolean,
    ClientError,
    {
      clubId: number;
      name: string;
      desc: string;
      signStartTime: number;
      signEndTime: number;
    }
  >(data => post('/cactivity/add', data), options);
}

type TVoteItem = {
  id: number;
  name: string;
  desc: string;
  createTime: string;
  clubId: number;
};

/**
 * 查看社团投票记录
 */
export function useVoteRecord(
  queryKey: QueryKey,
  variable: {
    clubId: number;
  },
  config?: UseQueryOptions<TVoteItem[], ClientError>,
) {
  return useQuery<TVoteItem[], ClientError>(
    queryKey,
    () => post('/vote/list', variable),
    config,
  );
}

type TPostsItem = {
  id: number;
  title: string;
  content: string;
  createdTime: string;
  clubId: number;
};

/**
 * 查看社团的交流平台
 */
export function usePostsList(
  queryKey: QueryKey,
  variable: {
    clubId: number;
  },
  config?: UseQueryOptions<TPostsItem[], ClientError>,
) {
  return useQuery<TPostsItem[], ClientError>(
    queryKey,
    () => post('/posts/list', variable),
    config,
  );
}

/**
 * 写帖子
 */
export function useWritePosts(
  options?: UseMutationOptions<
    boolean,
    ClientError,
    {
      clubId: number;
      title: string;
      content: string;
    }
  >,
) {
  return useMutation<
    boolean,
    ClientError,
    {
      clubId: number;
      title: string;
      content: string;
    }
  >(data => post('/posts/send', data), options);
}

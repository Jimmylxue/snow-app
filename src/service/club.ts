import {
  QueryKey,
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
} from 'react-query';
import { ClientError, post } from './client';
import { TUser } from './login';

export type TActivityItem = {
  clubActivityId: number;
  clubId: number;
  name: string;
  desc: string;
  signStartTime: number;
  signEndTime: number;
  createdTime: string;
};

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

export type TSignInItem = {
  id: number;
  activityId: number;
  createTime: string;
  user: TUser;
};

/**
 * 查看签到记录
 */
export function useActivitySignInRecord(
  queryKey: QueryKey,
  variable: {
    clubActivityId: number;
  },
  config?: UseQueryOptions<TSignInItem[], ClientError>,
) {
  return useQuery<TSignInItem[], ClientError>(
    queryKey,
    () => post('/cactivity/signInRecord', variable),
    config,
  );
}

export type TFeedbackItem = {
  id: number;
  content: string;
  activityId: number;
  createTime: string;
  user: TUser;
};

/**
 * 查看社团反馈记录
 */
export function useActivityFeedbackRecord(
  queryKey: QueryKey,
  variable: {
    clubActivityId: number;
  },
  config?: UseQueryOptions<TSignInItem[], ClientError>,
) {
  return useQuery<TSignInItem[], ClientError>(
    queryKey,
    () => post('/cactivity/feedbackRecord', variable),
    config,
  );
}

/**
 * 提交社团活动反馈
 */
export function useSendFeedback(
  options?: UseMutationOptions<
    boolean,
    ClientError,
    {
      clubId: number;
      clubActivityId: number;
      content: string;
    }
  >,
) {
  return useMutation<
    boolean,
    ClientError,
    {
      clubId: number;
      clubActivityId: number;
      content: string;
    }
  >(data => post('/cactivity/feedback', data), options);
}

/**
 * 社团活动签到
 */
export function useSignInActivity(
  options?: UseMutationOptions<
    boolean,
    ClientError,
    {
      clubId: number;
      clubActivityId: number;
    }
  >,
) {
  return useMutation<
    boolean,
    ClientError,
    {
      clubId: number;
      clubActivityId: number;
    }
  >(data => post('/cactivity/signIn', data), options);
}

/**
 * 管理员发起投票
 */
export function useLaunchVote(
  options?: UseMutationOptions<
    boolean,
    ClientError,
    {
      clubId: number;
      name: string;
      desc: string;
      voteStartTime: number;
      voteEndTime: number;
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
      voteStartTime: number;
      voteEndTime: number;
    }
  >(data => post('/vote/launch', data), options);
}

/**
 * 用户投票
 */
export function useChoiceVote(
  options?: UseMutationOptions<
    boolean,
    ClientError,
    {
      clubId: number;
      voteId: number;
      choose: 1 | 2;
    }
  >,
) {
  return useMutation<
    boolean,
    ClientError,
    {
      clubId: number;
      voteId: number;
      choose: 1 | 2;
    }
  >(data => post('/vote/choice', data), options);
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

export type TVoteItem = {
  id: number;
  name: string;
  desc: string;
  createTime: string;
  clubId: number;
  voteStatus: 1 | 2 | 3;
  voteStartTime: number;
  voteEndTime: number;
  recordItems: {
    choose: number;
    clubId: number;
    createTime: string;
    user: TUser;
    userId: number;
  }[];
  myVote: -1 | 1 | 2;
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

export type TPostComment = {
  clubId: number;
  clubPostId: number;
  commentId: number;
  content: string;
  createTime: string;
  user: TUser;
};

/**
 * 查看社团帖子的评论信息
 */
export function usePostsCommentList(
  queryKey: QueryKey,
  variable: {
    clubId: number;
    postId: number;
  },
  config?: UseQueryOptions<TPostComment[], ClientError>,
) {
  return useQuery<TPostComment[], ClientError>(
    queryKey,
    () => post('/posts/postCommentList', variable),
    config,
  );
}

/**
 * 写帖子评论
 */
export function useWritePostsComment(
  options?: UseMutationOptions<
    boolean,
    ClientError,
    {
      clubId: number;
      postsId: number;
      content: string;
    }
  >,
) {
  return useMutation<
    boolean,
    ClientError,
    {
      clubId: number;
      postsId: number;
      content: string;
    }
  >(data => post('/posts/comment', data), options);
}

/**
 * 点赞帖子
 */
export function useLikePost(
  options?: UseMutationOptions<
    boolean,
    ClientError,
    {
      clubId: number;
      postsId: number;
    }
  >,
) {
  return useMutation<
    boolean,
    ClientError,
    {
      clubId: number;
      postsId: number;
    }
  >(data => post('/posts/like', data), options);
}

/**
 * 查看某个帖子点赞的数量
 */
export function usePostLikeCount(
  queryKey: QueryKey,
  variable: {
    clubId: number;
    postId: number;
  },
  config?: UseQueryOptions<TPostComment[], ClientError>,
) {
  return useQuery<TPostComment[], ClientError>(
    queryKey,
    () => post('/posts/likePostUser', variable),
    config,
  );
}

/**
 * 管理员发送消息
 */
export function useSendLetter(
  options?: UseMutationOptions<
    string,
    ClientError,
    {
      clubId: number;
      title: string;
      content: string;
      platform: number;
    }
  >,
) {
  return useMutation<
    string,
    ClientError,
    {
      clubId: number;
      title: string;
      content: string;
      platform: number;
    }
  >(data => post('/club/sendNotice', data), options);
}

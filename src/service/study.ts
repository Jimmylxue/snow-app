import {
  QueryKey,
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from 'react-query';
import { ClientError, post } from './client';
import { TUser } from './login';

export enum EStudyRoomType {
  自由自习室 = 1,
  统一自习室,
}

type TStudyRoom = {
  id: number;
  studyRoomType: EStudyRoomType;
  openTime: string;
  closeTime: string;
  desc: string;
  max: number;
  createTime: string;
  updateTime: string;
};

/**
 * 获取所有的自习室
 */
export function useAllStudyRoom(
  queryKey: QueryKey,
  variable: {},
  config?: UseQueryOptions<TStudyRoom[], ClientError>,
) {
  return useQuery<TStudyRoom[], ClientError>(
    queryKey,
    () => post('/studyRoom/studyRoomList', variable),
    config,
  );
}

/**
 * 获取自习室详情
 */
export function useStudyRoomDetail(
  queryKey: QueryKey,
  variable: {},
  config?: UseQueryOptions<TStudyRoom, ClientError>,
) {
  return useQuery<TStudyRoom, ClientError>(
    queryKey,
    () => post('/studyRoom/studyRoomDetail', variable),
    config,
  );
}

/**
 * 加入自习室
 */
export function useJoinStudyRoom(
  options?: UseMutationOptions<boolean, ClientError, { studyRoomId: number }>,
) {
  return useMutation<boolean, ClientError, { studyRoomId: number }>(
    data => post('/studyRoom/joinStudyRoom', data),
    options,
  );
}

/**
 * 退出自习室
 */
export function useExitStudyRoom(
  options?: UseMutationOptions<boolean, ClientError, { studyRoomId: number }>,
) {
  return useMutation<boolean, ClientError, { studyRoomId: number }>(
    data => post('/studyRoom/exitStudyRoom', data),
    options,
  );
}

type TStudyRoomStatus = {
  studyTime: number;
  rank: number;
  exceedPercentage: string;
  gapWithPrev: number;
  gapWithFirst: number;
  totalUsers: number;
  prevUserStudyTime: number;
  firstUserStudyTime: number;
};

/**
 * 获取个人自习室排行相关
 */
export function useStudyRoomStatus(
  queryKey: QueryKey,
  variable: {},
  config?: UseQueryOptions<TStudyRoomStatus, ClientError>,
) {
  return useQuery<TStudyRoomStatus, ClientError>(
    queryKey,
    () => post('/studyRoom/studyStatus', variable),
    config,
  );
}

/**
 * 获取今日自习状态
 */
export function useTodayStudyStatus(
  queryKey: QueryKey,
  variable: {},
  config?: UseQueryOptions<boolean, ClientError>,
) {
  return useQuery<boolean, ClientError>(
    queryKey,
    () => post('/studyRoom/today', variable),
    config,
  );
}

type TStudyRecord = {
  id: number;
  userId: number;
  studyTime: number;
  endTime: string;
  studyRoomId: number;
  createTime: string;
  updateTime: string;
};

/**
 * 获取自习记录
 */
export function useStudyRecord(
  queryKey: QueryKey,
  variable: {},
  config?: UseQueryOptions<TStudyRecord[], ClientError>,
) {
  return useQuery<TStudyRecord[], ClientError>(
    queryKey,
    () => post('/studyRoom/studyRecord', variable),
    config,
  );
}

type TExamCompleteParams = {
  examProjectId: number;
  desc: string;
  useTime: number;
  overTime: number;
  remainTime: number;
  totalScore: number;
};

/**
 * 完成考试
 */
export function useFinishExam(
  options?: UseMutationOptions<boolean, ClientError, TExamCompleteParams>,
) {
  return useMutation<boolean, ClientError, TExamCompleteParams>(
    data => post('/examRecord/completeExam', data),
    options,
  );
}

type TExamStatus = {
  exam_count: number;
  rank: number;
  exceedPercentage: string;
  gapWithPrev: number;
  gapWithFirst: number;
  totalUsers: number;
  firstUserCount: number;
  prevUserExamCount: number;
};

/**
 * 获取个人考试次数排行相关
 */
export function useExamRank(
  queryKey: QueryKey,
  variable: {},
  config?: UseQueryOptions<TExamStatus, ClientError>,
) {
  return useQuery<TExamStatus, ClientError>(
    queryKey,
    () => post('/examRecord/examStatus', variable),
    config,
  );
}

/**
 * 获取今日考试
 */
export function useTodayExam(
  queryKey: QueryKey,
  variable: {},
  config?: UseQueryOptions<boolean, ClientError>,
) {
  return useQuery<boolean, ClientError>(
    queryKey,
    () => post('/examRecord/today', variable),
    config,
  );
}

export enum EExamType {
  数学 = 1,
  英语,
  政治,
}

type TExamRecord = {
  id: number;
  examType: EExamType;
  desc: string;
  useTime: number;
  overTime: number;
  remainTime: number;
  createdTime: string;
  updateTime: string;
};

/**
 * 获取考试记录
 */
export function useExamRecord(
  queryKey: QueryKey,
  variable: {},
  config?: UseQueryOptions<TExamRecord[], ClientError>,
) {
  return useQuery<TExamRecord[], ClientError>(
    queryKey,
    () => post('/examRecord/record', variable),
    config,
  );
}

type TExamPaper = {
  id: number;
  projectName: string;
  paperText: string;
  createdTime: string;
  updateTime: string;
};

/**
 * 获取考试卷子
 */
export function useExamPaper(
  queryKey: QueryKey,
  variable: {},
  config?: UseQueryOptions<TExamPaper[], ClientError>,
) {
  return useQuery<TExamPaper[], ClientError>(
    queryKey,
    () => post('/examRecord/examProject', variable),
    config,
  );
}

/**
 * 获取考试卷子详情
 */
export function useExamPaperDetail(
  queryKey: QueryKey,
  variable: {},
  config?: UseQueryOptions<TExamPaper, ClientError>,
) {
  return useQuery<TExamPaper, ClientError>(
    queryKey,
    () => post('/examRecord/projectDetail', variable),
    config,
  );
}

type TExamScoreRank = {
  bestScore: number;
  beatPercentage: number;
  gapToPrev: number;
  gapToFirst: number;
  prevRankScore: number;
  firstScore: number;
  rank: number;
};

/**
 * 获取考试成绩排行榜
 */
export function useExamScoreRank(
  queryKey: QueryKey,
  variable: {},
  config?: UseQueryOptions<TExamScoreRank, ClientError>,
) {
  return useQuery<TExamScoreRank, ClientError>(
    queryKey,
    () => post('/examRecord/examScoreRank', variable),
    config,
  );
}

type TListComplete = {
  id: number;
  questionTypeId: number;
  useTime: number;
  userId: number;
  createdTime: string;
  updateTime: string;
};

/**
 * 获取已完成题目列表
 */
export function useListComplete(
  queryKey: QueryKey,
  variable: {},
  config?: UseQueryOptions<TListComplete[], ClientError>,
) {
  return useQuery<TListComplete[], ClientError>(
    queryKey,
    () => post('/question/listComplete', variable),
    config,
  );
}

type TExamPre100Score = {
  id: number;
  examProjectId: number;
  totalScore: number;
  user: TUser;
  createdTime: string;
};

/**
 * 获取前100名考试成绩
 */
export function useExamPre100Score(
  queryKey: QueryKey,
  variable: {},
  config?: UseQueryOptions<TExamPre100Score[], ClientError>,
) {
  return useQuery<TExamPre100Score[], ClientError>(
    queryKey,
    () => post('/examRecord/examPre100Score', variable),
    config,
  );
}

type TAddCompleteParams = {
  questionTypeId: number;
  useTime: number;
};

/**
 * 上报完成考研项目
 */
export function useAddComplete(
  options?: UseMutationOptions<boolean, ClientError, TAddCompleteParams>,
) {
  return useMutation<boolean, ClientError, TAddCompleteParams>(
    data => post('/question/addComplete', data),
    options,
  );
}

type TCompleteRank = {
  percentage: string;
  firstComplete: {
    useTime: number;
    createdTime: string;
    user: TUser;
  };
  totalUsers: number;
  completedUsers: number;
};

/**
 * 获取进度打卡的
 */
export function useCompleteRank(
  queryKey: QueryKey,
  variable: {},
  config?: UseQueryOptions<TCompleteRank, ClientError>,
) {
  return useQuery<TCompleteRank, ClientError>(
    queryKey,
    () => post('/question/getCompleteRank', variable),
    config,
  );
}

/**
 * 获取学习室的在线人数
 */
export function useStudyRoomOnline(
  queryKey: QueryKey,
  variable: {
    studyRoomId: number;
  },
  config?: UseQueryOptions<number, ClientError>,
) {
  return useQuery<number, ClientError>(
    queryKey,
    () => post('/studyRoom/getStudyRoomUserCount', variable),
    config,
  );
}

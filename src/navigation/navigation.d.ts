export type TActivityItem = {
  clubActivityId: number;
  clubId: number;
  name: string;
  desc: string;
  signStartTime: number;
  signEndTime: number;
  createdTime: string;
};

export type RootStackParamList = {
  Mine: { userId: number };
  Main: undefined;
  IDPhoto: undefined;
  KnowledgePlanet: undefined;
  LuckDraw: undefined;
  Watermelon: undefined;
  StaticWebview: undefined;
  NativeModule: undefined;
  Index: undefined;
  Login: undefined;
  MainStack: undefined;
  Splash: undefined;
  Notice: undefined;
  ClubDetail: { clubId: number; clubName: string };
  ClubActivityDetail: { clubId: number; activity: TActivityItem };
  SignInRecord: { clubId: number; activity };
  FeedbackRecord: { clubId: number; activity };
  ClubPosts: { clubId: number; clubName: string };
  ClubVote: { clubId: number; clubName: string };
  ClubWritePosts: { clubId: number; clubName: string };
  ClubPostsDetail: {
    clubId: number;
    postId: number;
    postId: number;
    postFather: TPostsItem;
  };
};

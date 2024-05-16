type TLetter = {
  letterId: number;
  platform: number;
  title: string;
  content: string;
  createdTime: string;
};

export type TUserLetter = {
  recordId: number;
  status: EReadStatus;
  createdTime: string;
  letter: TLetter;
};

export type TSmsItem = {
  address: string;
  body: string;
};

enum ERole {
  托运人,
  承运人,
}

export type RootStackParamList = {
  Mine: { userId: number };
  MemberInfo: undefined;
  Choose: undefined;
  Main: undefined;
  IDPhoto: undefined;
  KnowledgePlanet: undefined;
  LuckDraw: undefined;
  Watermelon: undefined;
  StaticWebview: undefined;
  NativeModule: undefined;
  Index: undefined;
  Login: undefined;
  MainStack: { role: any };
  Splash: undefined;
  Notice: undefined;
  ClubDetail: { clubId: number; clubName: string; isManager?: boolean };
  ClubActivityDetail: {
    clubId: number;
    activity: TActivityItem;
    isManager?: boolean;
  };
  SignInRecord: { clubId: number; activity };
  FeedbackRecord: { clubId: number; activity };
  ClubPosts: { clubId: number; clubName: string; isManager?: boolean };
  ClubVote: { clubId: number; clubName: string; isManager?: boolean };
  ClubWritePosts: { clubId: number; clubName: string };
  ClubPostsDetail: {
    clubId: number;
    postId: number;
    postId: number;
    postFather: TPostsItem;
    isManager?: boolean;
  };
  NoticeDetail: { letter: TUserLetter };
  SmsList: undefined;
  SmsDetail: { message: TSmsItem };
  OrderDetail: { orderId: number };
  MatchedOrder: undefined;
};

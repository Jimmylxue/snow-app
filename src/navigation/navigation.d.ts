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

export type RootStackParamList = {
  Mine: { userId: number };
  MemberInfo: undefined;
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
  Video: { name: string; desc: string; source: string; courseId: number };
  CourseTypeDetail: { id: number; typeName: string; isManager?: boolean };
  CourseDetail: { id: number; typeName: string; isManager?: boolean };
  ExamQuestionList: { id: number; typeName: string; isManager?: boolean };
  Order: undefined;
};

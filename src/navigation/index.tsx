import { createStackNavigator } from '@react-navigation/stack';
import Index from '../pages/Index';
import Mine from '../pages/Mine';
import MemberInfo from '../pages/Mine/MemberInfo';
import IDPhoto from '../pages/IDPhoto';
import KnowledgePlanet from '../pages/KnowledgePlanet';
import LuckDraw from '../pages/LuckDraw';
import Watermelon from '../pages/Watermelon';
import StaticWebview from '../pages/StaticWebview';
import NativeModule from '../pages/NativeModule';
import { MainStack } from '../pages/Home';
import { Login } from '../pages/Login';
import { useEffect } from 'react';
import { resetNavigate } from './navigate';
import { useAppState } from '../hooks/useAppState';
import Splash from '../pages/Splash';
import ClubDetail from '../pages/Club/detail';
import ClubPosts from '../pages/Club/posts';
import ClubVote from '../pages/Club/vote';
import ClubWritePosts from '../pages/Club/writePosts';
import ClubPostsDetail from '../pages/Club/postDetail';
import Notice from '../pages/Notice';
import { logoutEmitter } from '../service/event';
import ActivityDetail from '../pages/Club/ActivityDetail';
import signInRecord from '../pages/Club/signInRecord';
import feedbackRecord from '../pages/Club/feedbackRecord';
import NoticeDetail from '../pages/Notice/detail';
import Sms from '../pages/Sms';
import SmsDetail from '../pages/Sms/detail';
import PVideo from '../pages/PVideo';
// import Video from '../pages/Videos/index';

export default function StackScreen() {
  const Stack = createStackNavigator();
  const { state, signOut } = useAppState();

  useEffect(() => {
    if (state.isLoading) {
      return;
    }
    if (state?.token) {
      resetNavigate({
        index: 0,
        routes: [{ name: 'MainStack' }],
      });
      return;
    }

    if (!state?.token) {
      resetNavigate({
        index: 0,
        routes: [{ name: 'Login' }],
      });
      return;
    }
  }, [state]);

  useEffect(() => {
    logoutEmitter.on('app-logout', () => {
      signOut?.();
    });

    return () => {
      logoutEmitter.off('app-logout');
    };
  }, [signOut]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: '#030303',
        headerTitleAlign: 'center',
        headerBackTitleVisible: false,
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: 'bold',
        },
        headerStyle: {
          borderBottomColor: '#ffffff',
          backgroundColor: '#fff',
          elevation: 0.5,
        },
      }}>
      <Stack.Screen
        name="Splash"
        options={{ headerShown: false }}
        component={Splash}
      />
      <Stack.Screen
        name="Login"
        options={{ headerShown: false }}
        component={Login}
      />
      <Stack.Screen
        name="MainStack"
        options={{ headerShown: false }}
        component={MainStack}
      />
      <Stack.Screen
        name="Index"
        options={{ headerShown: false }}
        component={Index}
      />
      <Stack.Screen
        name="Mine"
        options={{ headerShown: true }}
        component={Mine}
      />
      <Stack.Screen
        name="MemberInfo"
        options={{ headerShown: true, title: '个人信息' }}
        component={MemberInfo}
      />
      <Stack.Screen
        name="IDPhoto"
        options={{ title: 'IDPhoto' }}
        component={IDPhoto}
      />
      <Stack.Screen
        name="KnowledgePlanet"
        options={{ title: 'KnowledgePlanet' }}
        component={KnowledgePlanet}
      />
      <Stack.Screen
        name="LuckDraw"
        options={{ title: '今天吃啥' }}
        component={LuckDraw}
      />
      <Stack.Screen
        name="Watermelon"
        options={{ title: '西瓜成熟' }}
        component={Watermelon}
      />
      <Stack.Screen
        name="StaticWebview"
        options={{ title: 'StaticWebview' }}
        component={StaticWebview}
      />
      <Stack.Screen
        name="NativeModule"
        options={{ title: 'NativeModule' }}
        component={NativeModule}
      />
      <Stack.Screen
        name="ClubDetail"
        options={{ title: '社团详情' }}
        component={ClubDetail}
      />
      <Stack.Screen
        name="ClubActivityDetail"
        options={{ title: '活动详情' }}
        component={ActivityDetail}
      />
      <Stack.Screen
        name="SignInRecord"
        options={{ title: '签到记录' }}
        component={signInRecord}
      />
      <Stack.Screen
        name="FeedbackRecord"
        options={{ title: '反馈记录' }}
        component={feedbackRecord}
      />
      <Stack.Screen
        name="ClubVote"
        options={{ title: '社团投票' }}
        component={ClubVote}
      />
      <Stack.Screen
        name="ClubPosts"
        options={{ title: '社团帖子' }}
        component={ClubPosts}
      />
      <Stack.Screen
        name="ClubPostsDetail"
        options={{ title: '帖子详情' }}
        component={ClubPostsDetail}
      />
      <Stack.Screen
        name="ClubWritePosts"
        options={{ title: '发布帖子' }}
        component={ClubWritePosts}
      />
      <Stack.Screen
        name="Notice"
        options={{ title: '消息中心' }}
        component={Notice}
      />
      <Stack.Screen
        name="NoticeDetail"
        options={{ title: '消息详情' }}
        component={NoticeDetail}
      />
      <Stack.Screen
        name="SmsList"
        options={{ title: '短信列表' }}
        component={Sms}
      />
      <Stack.Screen
        name="SmsDetail"
        options={{ title: '短信详情' }}
        component={SmsDetail}
      />
      <Stack.Screen
        name="Video"
        options={{ title: '视频详情' }}
        component={PVideo}
      />
    </Stack.Navigator>
  );
}

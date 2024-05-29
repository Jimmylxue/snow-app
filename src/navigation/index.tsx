import { createStackNavigator } from '@react-navigation/stack';
import Index from '../pages/Index';
import Mine from '../pages/Mine';
import MemberInfo from '../pages/Mine/MemberInfo';
import { MainStack } from '../pages/Home';
import { Login } from '../pages/Login';
import { useEffect } from 'react';
import { resetNavigate } from './navigate';
import { useAppState } from '../hooks/useAppState';
import ClubWritePosts from '../pages/Club/writePosts';
import ClubPostsDetail from '../pages/Club/postDetail';
import { logoutEmitter } from '../service/event';
import PVideo from '../pages/VideoSite/videoPage';
import CourseTypeDetail from '../pages/VideoSite/detail';
import CourseDetail from '../pages/VideoSite/CourseDetail';
import ExamQuestionList from '../pages/Exam/ExamQuestionList';
import Order from '../pages/VideoSite/order';
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
  }, [state.isLoading, state.token]);

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
        name="Video"
        options={{ title: '视频详情' }}
        component={PVideo}
      />
      <Stack.Screen
        name="CourseTypeDetail"
        options={{ title: '视频分类详情' }}
        component={CourseTypeDetail}
      />
      <Stack.Screen
        name="CourseDetail"
        options={{ title: '视频详情' }}
        component={CourseDetail}
      />
      <Stack.Screen
        name="ExamQuestionList"
        options={{ title: '考试分类详情' }}
        component={ExamQuestionList}
      />
      <Stack.Screen
        name="Order"
        options={{ title: '我的订单' }}
        component={Order}
      />
    </Stack.Navigator>
  );
}

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Index from '../pages/Index';
import Mine from '../pages/Mine';
import MemberInfo from '../pages/Mine/MemberInfo';
import Watermelon from '../pages/Watermelon';
import StaticWebview from '../pages/StaticWebview';
import NativeModule from '../pages/NativeModule';
import { MainStack } from '../pages/Home';
import { Login } from '../pages/Login';
import { useEffect } from 'react';
import { resetNavigate } from './navigate';
import { useAppState } from '../hooks/useAppState';
import Splash from '../pages/Splash';
import ClubPosts from '../pages/Club/posts';
import ClubWritePosts from '../pages/Club/writePosts';
import ClubPostsDetail from '../pages/Club/postDetail';
import { logoutEmitter } from '../service/event';
import Choose from '../pages/Choose';
import StudyRoomList from '../pages/StudyRoomList';
import Exam from '../pages/Exam/index';
import { ExamPage } from '../pages/Question/Exam';
import StudyRoom from '../pages/StudyRoom';

export default function StackScreen() {
  const Stack = createStackNavigator();
  const { state, signOut } = useAppState();
  console.log('state', state.userInfo?.role);
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
        name="Choose"
        options={{ headerShown: false }}
        component={Choose}
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
        name="StudyRoomList"
        component={StudyRoomList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Exam"
        options={{ headerShown: false }}
        component={Exam}
      />
      {/* 老考试刷题 */}
      <Stack.Screen
        name="ExamPage"
        options={{ headerShown: true }}
        component={ExamPage}
      />
      <Stack.Screen
        name="StudyRoom"
        options={{ headerShown: true }}
        component={StudyRoom}
      />
    </Stack.Navigator>
  );
}

import { Image } from 'native-base';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Index from '../Index';
import Mine from '../Mine';
import Club from '../Club';
import { ManagerAllClub } from '../Club/View/ManagerAll';
import { useAppState } from '../../hooks/useAppState';
import { ERoleType } from '../../service';
import VideoSite from '../VideoSite';
import { ManagerAllCourse } from '../VideoSite/View/ManagerAll';
import PostPage from '../VideoSite/posts';
import { UploadVideo } from '../VideoSite/View/UploadVideo';

const Tab = createBottomTabNavigator();

export function MainStack() {
  const { state } = useAppState();

  const isManager = state.userInfo?.role === ERoleType.管理员;

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#3498db',
      }}>
      <Tab.Screen
        name="Home"
        options={{
          headerTransparent: true,
          tabBarLabel: '首页',
          title: '首页',
          headerShown: true,
          headerBackgroundContainerStyle: {
            backgroundColor: '#fff',
          },
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require('../../images/home-selected.png')
                  : require('../../images/home-default.png')
              }
              w="25px"
              h="25px"
              alt="图片"
            />
          ),
        }}
        component={VideoSite}
      />
      <Tab.Screen
        name="Chat"
        options={{
          headerTransparent: true,
          tabBarLabel: '交流',
          title: '交流',
          headerShown: true,
          headerBackgroundContainerStyle: {
            backgroundColor: '#fff',
          },
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require('../../images/pic-selected.png')
                  : require('../../images/pic-default.png')
              }
              w="25px"
              h="25px"
              alt="图片"
            />
          ),
        }}
        component={PostPage}
      />
      <Tab.Screen
        name="UploadVideo"
        options={{
          headerTransparent: true,
          tabBarLabel: '上传',
          title: '上传',
          headerShown: true,
          headerBackgroundContainerStyle: {
            backgroundColor: '#fff',
          },
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require('../../images/pic-selected.png')
                  : require('../../images/pic-default.png')
              }
              w="25px"
              h="25px"
              alt="图片"
            />
          ),
        }}
        component={UploadVideo}
      />
      <Tab.Screen
        name="Mine"
        options={{
          headerTransparent: true,
          tabBarLabel: '我的',
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require('../../images/person-selected.png')
                  : require('../../images/person-default.png')
              }
              w="25px"
              h="25px"
              alt="图片"
            />
          ),
        }}
        component={Mine}
      />
    </Tab.Navigator>
  );
}

import { Image } from 'native-base';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Mine from '../Mine';
import { useAppState } from '../../hooks/useAppState';
import { ERoleType } from '../../service';
import StudentManager from '../StudentManager';
import posts from '../StudentManager/posts';
import Index from '../Index';
import { SleepTimeProvider } from '../StudentManager/core';

const Tab = createBottomTabNavigator();

export function MainStack() {
  return (
    <SleepTimeProvider>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#3498db',
        }}>
        <Tab.Screen
          name="Home"
          options={{
            // headerTransparent: true,
            tabBarLabel: '首页',
            title: '首页',
            headerShown: true,
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
          component={StudentManager}
          // component={Index}
        />
        <Tab.Screen
          name="FamPosts"
          options={{
            headerShown: true,
            // headerTransparent: true,
            title: '家庭圈',
            tabBarLabel: '家庭圈',
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
          component={posts}
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
    </SleepTimeProvider>
  );
}

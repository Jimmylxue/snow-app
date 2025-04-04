import React from 'react';
import { Image, Text } from 'native-base';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Mine from '../Mine';
import Choose from '../Choose';
import StudyRoomList from '../StudyRoomList';
import ExamList from '../Exam/ExamList';
import ClockIn from '../ClockIn';
import { UploadExam } from '../Question/UploadQuestion';
import { useAppState } from '../../hooks/useAppState';
import { ERoleType } from '../../service';
import { TouchableOpacity } from 'react-native';
import { navigates } from '../../navigation/navigate';
const Tab = createBottomTabNavigator();

export function MainStack() {
  const { state } = useAppState();
  const { userInfo } = state;

  const isAdmin = userInfo?.role !== ERoleType.管理员;

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#3498db',
      }}>
      {isAdmin && (
        <Tab.Screen
          name="UploadQuestion"
          options={{
            // headerTransparent: true,
            tabBarLabel: '上传题目',
            title: '上传题目',
            headerShown: false,
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
          component={UploadExam}
          // component={Index}
        />
      )}

      {!isAdmin && (
        <Tab.Group>
          <Tab.Screen
            name="Home"
            options={{
              // headerTransparent: true,
              tabBarLabel: '首页',
              title: '首页',
              headerShown: false,
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
            component={Choose}
            // component={Index}
          />
          <Tab.Screen
            name="StudyRoomList"
            options={{
              headerShown: true,
              // headerTransparent: true,
              title: '自习室',
              tabBarLabel: '自习室',
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
            component={StudyRoomList}
          />
          <Tab.Screen
            name="ExamList"
            options={{
              headerShown: true,
              title: '考试',
              tabBarLabel: '考试',
              tabBarIcon: ({ focused }) => (
                <Image
                  source={
                    focused
                      ? require('../../images/exam-selected.png')
                      : require('../../images/exam-default.png')
                  }
                  w="25px"
                  h="25px"
                  alt="图片"
                />
              ),
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => navigates('CountRank', undefined)}>
                  <Text mr={2}>次数排行榜</Text>
                </TouchableOpacity>
              ),
            }}
            component={ExamList}
          />
          <Tab.Screen
            name="ClockIn"
            options={{
              headerShown: true,
              title: '打卡',
              tabBarLabel: '打卡',
              tabBarIcon: ({ focused }) => (
                <Image
                  source={
                    focused
                      ? require('../../images/clock-selected.png')
                      : require('../../images/clock-default.png')
                  }
                  w="25px"
                  h="25px"
                  alt="图片"
                />
              ),
            }}
            component={ClockIn}
          />
        </Tab.Group>
      )}

      {/* <Tab.Screen
          name="StudyRoom"
          options={{
            headerShown: true,
            // headerTransparent: true,
            title: '自习室',
            tabBarLabel: '自习室',
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
          component={StudyRoom}
        /> */}
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

import { Image } from 'native-base';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Mine from '../Mine';
import { useAppState } from '../../hooks/useAppState';
import { ERoleType } from '../../service';
import VideoSite from '../VideoSite';
import PostPage from '../VideoSite/posts';
import { UploadVideo } from '../VideoSite/View/UploadVideo';
import { UploadExam } from '../Exam/UploadQuestion';
import { ExamTypeList } from '../Exam/ExamTypeList';
import { ExamPage } from '../Exam/Exam';

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
      {!isManager && (
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
                    ? require('../../images/chat-selected.png')
                    : require('../../images/chat-default.png')
                }
                w="25px"
                h="25px"
                alt="图片"
              />
            ),
          }}
          component={PostPage}
        />
      )}

      {isManager && (
        <Tab.Screen
          name="UploadVideo"
          options={{
            headerTransparent: true,
            tabBarLabel: '上传课程',
            title: '上传课程',
            headerShown: true,
            headerBackgroundContainerStyle: {
              backgroundColor: '#fff',
            },
            tabBarIcon: ({ focused }) => (
              <Image
                source={
                  focused
                    ? require('../../images/upload-selected.png')
                    : require('../../images/upload-default.png')
                }
                w="25px"
                h="25px"
                alt="图片"
              />
            ),
          }}
          component={UploadVideo}
        />
      )}

      <Tab.Screen
        name="ExamPage"
        options={{
          headerTransparent: true,
          tabBarLabel: '刷题',
          title: '刷题',
          headerShown: true,
          headerBackgroundContainerStyle: {
            backgroundColor: '#fff',
          },
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
        }}
        component={ExamPage}
      />

      {isManager && (
        <Tab.Screen
          name="ExamTypeList"
          options={{
            headerTransparent: true,
            tabBarLabel: '题目分类',
            title: '题目分类',
            headerShown: true,
            headerBackgroundContainerStyle: {
              backgroundColor: '#fff',
            },
            tabBarIcon: ({ focused }) => (
              <Image
                source={
                  focused
                    ? require('../../images/classification-selected.png')
                    : require('../../images/classification-default.png')
                }
                w="25px"
                h="25px"
                alt="图片"
              />
            ),
          }}
          component={ExamTypeList}
        />
      )}

      {isManager && (
        <Tab.Screen
          name="UploadExam"
          options={{
            headerTransparent: true,
            tabBarLabel: '上传题目',
            title: '上传题目',
            headerShown: true,
            headerBackgroundContainerStyle: {
              backgroundColor: '#fff',
            },
            tabBarIcon: ({ focused }) => (
              <Image
                source={
                  focused
                    ? require('../../images/upload-selected.png')
                    : require('../../images/upload-default.png')
                }
                w="25px"
                h="25px"
                alt="图片"
              />
            ),
          }}
          component={UploadExam}
        />
      )}

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

import { Image } from 'native-base';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Mine from '../Mine';
import Club from '../Club';
import { ManagerAllClub } from '../Club/View/ManagerAll';
import { useAppState } from '../../hooks/useAppState';
import { ERoleType } from '../../service';

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
        name="ManagerIndex"
        options={{
          headerTransparent: true,
          tabBarLabel: isManager ? '管理' : '社团',
          title: isManager ? '管理' : '社团',
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
        component={isManager ? ManagerAllClub : Club}
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

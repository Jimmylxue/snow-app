import { Image } from 'native-base';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Index from '../Index';
import Mine from '../Mine';
import Club from '../Club';

const Tab = createBottomTabNavigator();

export function MainStack() {
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
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require('../../images/home-active.png')
                  : require('../../images/home.png')
              }
              w="25px"
              h="25px"
              alt="图片"
            />
          ),
        }}
        component={Index}
      />
      <Tab.Screen
        name="Club"
        options={{
          headerTransparent: true,
          tabBarLabel: '社团',
          title: '社团',
          headerShown: true,
          // headerTitleAlign: 'left',
          headerBackgroundContainerStyle: {
            backgroundColor: '#fff',
          },
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require('../../images/home-active.png')
                  : require('../../images/home.png')
              }
              w="25px"
              h="25px"
              alt="图片"
            />
          ),
        }}
        component={Club}
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
                  ? require('../../images/home-active.png')
                  : require('../../images/home.png')
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

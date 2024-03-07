import { Image } from 'native-base';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Index from '../Index';

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
    </Tab.Navigator>
  );
}

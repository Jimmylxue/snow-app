import { Image } from 'native-base';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Mine from '../Mine';
import { useAppState } from '../../hooks/useAppState';
import { ERoleType } from '../../service';
import Order from '../Order';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/navigation';
import { ERole } from '../Choose';
import ChengYun from '../Luggage/ChengYun';

const Tab = createBottomTabNavigator();
type RouterParams = RouteProp<RootStackParamList, 'MainStack'>;

export function MainStack() {
  const { params } = useRoute<RouterParams>();

  /** 是否是承运人 */
  const isChenYun = params.role === ERole.承运人;

  console.log('ppp', params, isChenYun);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#3498db',
      }}>
      <Tab.Screen
        name="ChengYun"
        options={{
          headerTransparent: true,
          tabBarLabel: '承运',
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
        component={ChengYun}
      />
      <Tab.Screen
        name="Order"
        options={{
          headerTransparent: true,
          tabBarLabel: '订单',
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
        component={Order}
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

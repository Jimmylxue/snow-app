import { Image } from 'native-base';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Mine from '../Mine';
import Order from '../Order';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/navigation';
import { ERole } from '../Choose';
import ChengYun from '../Luggage/ChengYun';
import TuoYun from '../Luggage/TuoYun';

const Tab = createBottomTabNavigator();
type RouterParams = RouteProp<RootStackParamList, 'MainStack'>;

export function MainStack() {
  const { params } = useRoute<RouterParams>();

  /** 是否是承运人 */
  const isChenYun = Number(params.role) === ERole.承运人;

  console.log('ppp', params, isChenYun);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#3498db',
      }}>
      <Tab.Screen
        name={isChenYun ? 'ChengYun' : 'TuoYun'}
        options={{
          headerShown: true,
          headerBackgroundContainerStyle: {
            backgroundColor: '#FFF',
          },
          title: isChenYun ? '车辆信息' : '托运',
          headerTransparent: true,
          tabBarLabel: isChenYun ? '承运' : '托运',
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
        component={isChenYun ? ChengYun : TuoYun}
      />
      <Tab.Screen
        name="Order"
        options={{
          headerShown: true,
          headerBackgroundContainerStyle: {
            backgroundColor: '#FFF',
          },
          title: '订单中心',
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

import { createStackNavigator } from '@react-navigation/stack';
import Mine from '../pages/Mine';
import MemberInfo from '../pages/Mine/MemberInfo';
import { MainStack } from '../pages/Home';
import { Login } from '../pages/Login';
import { useEffect } from 'react';
import { resetNavigate } from './navigate';
import { useAppState } from '../hooks/useAppState';
import Splash from '../pages/Splash';
import { logoutEmitter } from '../service/event';
import Choose from '../pages/Choose';
import OrderDetail from '../pages/Order/detail';
import MatchedOrder from '../pages/Order/MatchedOrder';

export default function StackScreen() {
  const Stack = createStackNavigator();
  const { state, signOut } = useAppState();

  useEffect(() => {
    if (state.isLoading) {
      return;
    }
    if (state?.token && state.userInfo) {
      resetNavigate({
        index: 0,
        // routes: [{ name: 'MainStack' }],
        routes: [{ name: 'Choose' }],
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
  }, [state]);

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
        options={{ title: '选择角色' }}
        component={Choose}
      />
      <Stack.Screen
        name="MainStack"
        options={{ headerShown: false }}
        component={MainStack}
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
        name="OrderDetail"
        options={{ title: '订单详情' }}
        component={OrderDetail}
      />
      <Stack.Screen
        name="MatchedOrder"
        options={{ title: '已匹配订单' }}
        component={MatchedOrder}
      />
    </Stack.Navigator>
  );
}

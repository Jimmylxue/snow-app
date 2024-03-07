import { createStackNavigator } from '@react-navigation/stack';
import Index from '../pages/Index';
import Mine from '../pages/Mine';
import IDPhoto from '../pages/IDPhoto';
import KnowledgePlanet from '../pages/KnowledgePlanet';
import LuckDraw from '../pages/LuckDraw';
import Watermelon from '../pages/Watermelon';
import StaticWebview from '../pages/StaticWebview';
import NativeModule from '../pages/NativeModule';
import { MainStack } from '../pages/Home';
import { Login } from '../pages/Login';
import { useEffect } from 'react';
import { resetNavigate } from './navigate';
import { useAppState } from '../hooks/useAppState';

export default function StackScreen() {
  const Stack = createStackNavigator();
  const { state } = useAppState();

  useEffect(() => {
    if (state?.token) {
      resetNavigate({
        index: 0,
        routes: [{ name: 'MainStack' }],
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
        name="Login"
        options={{ headerShown: false }}
        component={Login}
      />
      <Stack.Screen
        name="MainStack"
        options={{ headerShown: false }}
        component={MainStack}
      />
      <Stack.Screen
        name="Index"
        options={{ headerShown: false }}
        component={Index}
      />
      <Stack.Screen
        name="Mine"
        options={{ headerShown: true }}
        component={Mine}
      />
      <Stack.Screen
        name="IDPhoto"
        options={{ title: 'IDPhoto' }}
        component={IDPhoto}
      />
      <Stack.Screen
        name="KnowledgePlanet"
        options={{ title: 'KnowledgePlanet' }}
        component={KnowledgePlanet}
      />
      <Stack.Screen
        name="LuckDraw"
        options={{ title: '今天吃啥' }}
        component={LuckDraw}
      />
      <Stack.Screen
        name="Watermelon"
        options={{ title: '西瓜成熟' }}
        component={Watermelon}
      />
      <Stack.Screen
        name="StaticWebview"
        options={{ title: 'StaticWebview' }}
        component={StaticWebview}
      />
      <Stack.Screen
        name="NativeModule"
        options={{ title: 'NativeModule' }}
        component={NativeModule}
      />
    </Stack.Navigator>
  );
}

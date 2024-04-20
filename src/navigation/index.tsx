import { createStackNavigator } from '@react-navigation/stack';
import Sms from '../pages/Sms';
import SmsDetail from '../pages/Sms/detail';

export default function StackScreen() {
  const Stack = createStackNavigator();

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
        name="SmsList"
        options={{ title: '短信列表' }}
        component={Sms}
      />
      <Stack.Screen
        name="SmsDetail"
        options={{ title: '短信详情' }}
        component={SmsDetail}
      />
    </Stack.Navigator>
  );
}

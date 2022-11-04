import { createStackNavigator } from '@react-navigation/stack';
import Index from '../pages/Index';
import Mine from '../pages/Mine';
import IDPhoto from '../pages/IDPhoto';
import KnowledgePlanet from '../pages/KnowledgePlanet';

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
    </Stack.Navigator>
  );
}

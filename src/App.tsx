import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackScreen from './navigation';
import { navigationRef } from './navigation/navigate';
import { useReactQuery } from './config/react-query';
import { NativeBaseProvider } from 'native-base';
const { queryClient, QueryClientProvider } = useReactQuery();

const App = () => {
  return (
    <NativeBaseProvider>
      <NavigationContainer ref={navigationRef}>
        <QueryClientProvider client={queryClient}>
          <StackScreen />
        </QueryClientProvider>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;

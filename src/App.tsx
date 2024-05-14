import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackScreen from './navigation';
import { navigationRef } from './navigation/navigate';
import { useReactQuery } from './config/react-query';
import { NativeBaseProvider } from 'native-base';
import { AppContextProvider } from './hooks/useAppState';

const { queryClient, QueryClientProvider } = useReactQuery();

const App = () => {
  return (
    <NativeBaseProvider>
      <NavigationContainer ref={navigationRef}>
        <QueryClientProvider client={queryClient}>
          <AppContextProvider>
            <StackScreen />
          </AppContextProvider>
        </QueryClientProvider>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;

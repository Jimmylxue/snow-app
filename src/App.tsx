import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackScreen from './navigation';
import { navigationRef } from './navigation/navigate';
import { config } from './config/react-query';
import { AppContextProvider } from './hooks/useAppState';
import { NativeBaseProvider } from 'native-base';
import { LocationContextProvider } from './hooks/useLocation';
const { queryClient, QueryClientProvider } = config();

const App = () => {
  return (
    <NativeBaseProvider>
      <NavigationContainer ref={navigationRef}>
        <QueryClientProvider client={queryClient}>
          <LocationContextProvider>
            <AppContextProvider>
              <StackScreen />
            </AppContextProvider>
          </LocationContextProvider>
        </QueryClientProvider>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;

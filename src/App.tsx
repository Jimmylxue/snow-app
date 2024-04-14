import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackScreen from './navigation';
import { navigationRef } from './navigation/navigate';
import { config } from './config/react-query';
import { APPContext, useInitApp } from './hooks/useAppState';
import { NativeBaseProvider } from 'native-base';
import { LocationContextProvider } from './hooks/useLocation';
const { queryClient, QueryClientProvider } = config();

const App = () => {
  const { state, ...authContext } = useInitApp();
  return (
    <NativeBaseProvider>
      <NavigationContainer ref={navigationRef}>
        <QueryClientProvider client={queryClient}>
          <LocationContextProvider>
            <APPContext.Provider
              value={{
                state: state!,
                ...authContext,
              }}>
              <StackScreen />
            </APPContext.Provider>
          </LocationContextProvider>
        </QueryClientProvider>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;

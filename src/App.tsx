import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackScreen from './navigation';
import { navigationRef } from './navigation/navigate';
import { config } from './config/react-query';

const { queryClient, QueryClientProvider } = config();

const App = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <QueryClientProvider client={queryClient}>
        <StackScreen />
      </QueryClientProvider>
    </NavigationContainer>
  );
};

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

export default App;

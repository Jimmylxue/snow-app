import { View } from 'native-base';
import React from 'react';
import { ActivityIndicator } from 'react-native';

export default function Splash() {
  return (
    <View w="full" h="full" justifyContent="center" alignItems="center">
      <ActivityIndicator size="large" />
    </View>
  );
}

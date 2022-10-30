import { NavigationContainerRef } from '@react-navigation/native';
import * as React from 'react';
import { RootStackParamList } from './navigation';

export const navigationRef =
  React.createRef<NavigationContainerRef<RootStackParamList>>();

export default function navigates<T extends keyof RootStackParamList>(
  name: T,
  params: RootStackParamList[T],
) {
  navigationRef.current?.navigate(name as any, params);
}

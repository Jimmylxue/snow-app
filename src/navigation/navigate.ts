import { NavigationContainerRef } from '@react-navigation/native';
import * as React from 'react';
import { RootStackParamList } from './navigation';

export const navigationRef =
  React.createRef<NavigationContainerRef<RootStackParamList>>();

export function navigates<T extends keyof RootStackParamList>(
  name: T,
  params: RootStackParamList[T],
) {
  navigationRef.current?.navigate(name as any, params);
}

export function goBack() {
  navigationRef.current?.goBack();
}

export function resetNavigate({
  index,
  routes,
}: {
  index: number;
  routes: {
    name: keyof RootStackParamList;
    params?: RootStackParamList[keyof RootStackParamList];
  }[];
}) {
  return navigationRef.current?.reset({
    index,
    routes,
  });
}

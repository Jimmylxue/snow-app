import { Alert, Platform } from 'react-native';

type TAlertType = {
  message: string;
  title?: string;
};

export function showAlert({ message, title }: TAlertType) {
  Alert.alert(title || '', message);
}

export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

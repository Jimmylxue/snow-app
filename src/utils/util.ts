import { Alert, Platform, Linking } from 'react-native';
type TAlertType = {
  message: string;
  title?: string;
};

export function showAlert({ message, title }: TAlertType) {
  Alert.alert(title || '', message);
}

export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

export function callPhone(phone: string | number) {
  const phoneNumber = `tel:${phone}`;
  Linking.canOpenURL(phoneNumber)
    .then(supported => {
      if (!supported) {
        console.log('无法拨打电话');
      } else {
        return Linking.openURL(phoneNumber);
      }
    })
    .catch(error => console.error('发生错误', error));
}

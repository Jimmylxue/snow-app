import { useToast } from 'native-base';
import { Alert } from 'react-native';

type TAlertType = {
  message: string;
  title?: string;
};

export function showAlert({ message, title }: TAlertType) {
  Alert.alert(title || '', message);
}

import { useEffect, useState } from 'react';
import { NativeModules, PermissionsAndroid } from 'react-native';
import { TSmsItem } from '../navigation/navigation';

interface TSms {
  getSms(filterCount: number, isShowAll: boolean): Promise<TSmsItem[]>;
}

const { Sms } = NativeModules;

// Sms as TSms;
export function useSms() {
  const [smsList, setSmsList] = useState<TSmsItem[]>([]);

  const getAndroidSms = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_SMS,
        {
          title: 'SMS Permission',
          message: 'This app needs access to your SMS to read your messages.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('SMS permission granted');
        (Sms as TSms)
          .getSms(30, true)
          .then(smsArray => {
            // 处理返回的短信数组
            setSmsList(smsArray);
          })
          .catch(error => {
            // 处理错误
            console.error(error);
          });
      } else {
        console.log('SMS permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    getAndroidSms();
  }, []);

  return { smsList };
}

import { QueryKey, UseQueryOptions, useQuery } from 'react-query';
import { ClientError, getWithOutHeader, post } from './client';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TSmsItem } from '../navigation/navigation';
import { Toast } from 'native-base';

export function useSmsList(
  queryKey: QueryKey,
  variable: {},
  config?: UseQueryOptions<string[], ClientError>,
) {
  return useQuery<string[], ClientError>(
    queryKey,
    () => getWithOutHeader('/random_sms/'),
    config,
  );
}

export function useSmsCheck(
  queryKey: QueryKey,
  variable: { text: string },
  config?: UseQueryOptions<{ is_spam: string }, ClientError>,
) {
  return useQuery<{ is_spam: string }, ClientError>(
    queryKey,
    () => post('/classify_sms/', variable),
    config,
  );
}

const SMS_KEY = 'snow_sms_key';

export function useBlackList() {
  const [blackList, setBlackList] = useState<TSmsItem[]>([]);

  const initStats = async () => {
    const res = await AsyncStorage.getItem(SMS_KEY);
    try {
      const arrData = JSON.parse(res || '[]');
      setBlackList(arrData);
    } catch (error) {
      setBlackList([]);
    }
  };

  useEffect(() => {
    initStats();
  }, []);

  /**
   * 添加黑名单
   */
  const addBlack = async (info: TSmsItem) => {
    if (blackList.find(item => item.body === info.body)) {
      Toast.show({
        title: '该短信已在黑名单中',
      });
      return false;
    } else {
      blackList.push(info);
      await AsyncStorage.setItem(SMS_KEY, JSON.stringify(blackList));
      return true;
    }
  };

  return {
    blackList,
    addBlack,
  };
}

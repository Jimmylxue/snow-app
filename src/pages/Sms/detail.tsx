import { RouteProp, useRoute } from '@react-navigation/native';
import { View, Text } from 'native-base';
import { memo } from 'react';
import { RootStackParamList } from '../../navigation/navigation';
import { useSmsCheck } from '../../service/useSms';
type RouterParams = RouteProp<RootStackParamList, 'SmsDetail'>;

export default memo(() => {
  const { params } = useRoute<RouterParams>();

  const { data } = useSmsCheck(
    ['smsCheck', params],
    {
      text: params.message.body,
    },
    {
      enabled: !!params.message.body,
    },
  );

  return (
    <View h="full" backgroundColor="#FFF" p="2">
      <View flexDirection="row">
        <Text fontSize="lg" fontWeight="semibold">
          发件人：
        </Text>
        <Text fontSize="lg" fontWeight="semibold">
          {params.message.address}
        </Text>
      </View>

      <Text fontSize="md" mt="4">
        {params.message.body}
      </Text>
      {data && data?.is_spam ? (
        <Text mt="4" fontWeight="semibold">
          该短信是 垃圾短信！
        </Text>
      ) : (
        <Text mt="4" fontWeight="semibold">
          该短信不是垃圾短信！
        </Text>
      )}
    </View>
  );
});

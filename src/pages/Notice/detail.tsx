import { RouteProp, useRoute } from '@react-navigation/native';
import { View, Text } from 'native-base';
import { memo } from 'react';
import { RootStackParamList } from '../../navigation/navigation';
type RouterParams = RouteProp<RootStackParamList, 'NoticeDetail'>;

export default memo(() => {
  const { params } = useRoute<RouterParams>();

  return (
    <View h="full" backgroundColor="#FFF" p="2">
      <Text fontSize="lg" fontWeight="semibold">
        {params.letter.letter.title}
      </Text>
      <Text mt="2">{params.letter.letter.content}</Text>
    </View>
  );
});

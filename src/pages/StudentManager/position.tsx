import { RouteProp, useRoute } from '@react-navigation/native';
import { ScrollView, Text, View } from 'native-base';
import { SafeAreaView } from 'react-native';
import { RootStackParamList } from '../../navigation/navigation';
import { useChildrenPositionList } from '../../service/studentManager';
import { baseFormatTime } from '../../utils';

type RouterParams = RouteProp<RootStackParamList, 'PositionRecord'>;

export function PositionRecord() {
  const { params } = useRoute<RouterParams>();

  const { data } = useChildrenPositionList(
    ['childrenPositionList', params?.userId],
    {
      userId: params?.userId,
    },
    {
      enabled: !!params.userId,
    },
  );

  console.log('data', data);

  return (
    <SafeAreaView>
      <ScrollView px={2} h="full">
        {data?.map(item => (
          <View key={item.id} bg="#FFF" px={2} py={2} rounded="md" mt={2}>
            <View flexDir="row" justifyContent="space-between">
              <Text>经纬度信息：</Text>
              <Text>
                {item.latitude}，{item.longitude}
              </Text>
            </View>
            <View flexDir="row" justifyContent="space-between">
              <Text>上报时间：</Text>
              <Text>{baseFormatTime(item.createdTime)}</Text>
            </View>
            <View>
              <Text>大体所在位置：</Text>
              <Text>{item.formatted_address}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

import { memo, useEffect } from 'react';
import { ScrollView, View } from 'native-base';
import { SafeAreaView } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/navigation';
import { useActivitySignInRecord } from '../../service/club';
import SignInCard from './components/SignInCard';

type RouterParams = RouteProp<RootStackParamList, 'SignInRecord'>;

/**
 * 签到记录
 */
export default memo(() => {
  const { params } = useRoute<RouterParams>();
  const navigation = useNavigation();
  const { data } = useActivitySignInRecord(
    ['activitySignInRecord'],
    {
      clubActivityId: params.activity.clubActivityId,
    },
    {
      enabled: !!params.activity.clubActivityId,
    },
  );

  useEffect(() => {
    navigation.setOptions({
      title: params.activity.name + '签到记录',
    });
  }, [params, navigation]);

  return (
    <SafeAreaView>
      <View flexDirection="column" position="relative" pb="12" h="full">
        <ScrollView>
          {data?.map(record => (
            <SignInCard key={record.id} record={record} />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
});

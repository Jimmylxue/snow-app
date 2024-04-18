import { memo, useEffect } from 'react';
import { ScrollView, View } from 'native-base';
import { SafeAreaView } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/navigation';
import { useActivityFeedbackRecord } from '../../service/club';
import SignInCard from './components/SignInCard';
import PostComment from './components/PostComment';

type RouterParams = RouteProp<RootStackParamList, 'SignInRecord'>;

/**
 * 反馈记录
 */
export default memo(() => {
  const { params } = useRoute<RouterParams>();
  const navigation = useNavigation();
  const { data } = useActivityFeedbackRecord(
    ['activityFeedbackRecord'],
    {
      clubActivityId: params.activity.clubActivityId,
    },
    {
      enabled: !!params.activity.clubActivityId,
    },
  );

  useEffect(() => {
    navigation.setOptions({
      title: params.activity.name + '反馈记录',
    });
  }, [params, navigation]);

  return (
    <SafeAreaView>
      <View flexDirection="column" position="relative" pb="12" h="full">
        <ScrollView>
          {data?.map(record => (
            <PostComment key={record.id} comment={record as any} />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
});

import { memo, useEffect } from 'react';
import { ScrollView, View } from 'native-base';
import { SafeAreaView } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/navigation';
import VoteCard from './components/VoteCard';
import { useVoteRecord } from '../../service/club';

type RouterParams = RouteProp<RootStackParamList, 'ClubDetail'>;

export default memo(() => {
  const { params } = useRoute<RouterParams>();
  const navigation = useNavigation();

  const { data } = useVoteRecord(
    ['voteList'],
    {
      clubId: params.clubId,
    },
    {
      enabled: !!params.clubId,
    },
  );

  useEffect(() => {
    navigation.setOptions({
      title: params.clubName + ' - 投票记录',
    });
  }, [params, navigation]);

  return (
    <SafeAreaView>
      <View flexDirection="column" position="relative">
        <ScrollView>
          {data?.map(item => (
            <VoteCard key={item.id} name={item.name} desc={item.desc} />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
});

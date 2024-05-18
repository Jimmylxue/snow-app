import { memo, useEffect } from 'react';
import { ScrollView, Toast, View } from 'native-base';
import { SafeAreaView } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/navigation';
import VoteCard from './components/VoteCard';
import { useChoiceVote, useVoteRecord } from '../../service/club';

type RouterParams = RouteProp<RootStackParamList, 'ClubVote'>;

export default memo(() => {
  const { params } = useRoute<RouterParams>();
  const navigation = useNavigation();

  const { data, refetch } = useVoteRecord(
    ['voteList'],
    {
      clubId: params.clubId,
    },
    {
      enabled: !!params.clubId,
    },
  );

  const { mutateAsync } = useChoiceVote({
    onSuccess() {
      Toast.show({
        title: '投票成功',
      });
      refetch();
    },
  });

  useEffect(() => {
    navigation.setOptions({
      title: params.clubName + ' - 历史投票',
    });
  }, [params, navigation]);

  return (
    <SafeAreaView>
      <View flexDirection="column" position="relative">
        <ScrollView>
          {data?.map(item => (
            <VoteCard
              info={item}
              key={item.id}
              onVote={async (status: 1 | 2) => {
                await mutateAsync({
                  clubId: params.clubId,
                  voteId: item.id,
                  choose: status,
                });
              }}
              isManager={!!params.isManager}
            />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
});

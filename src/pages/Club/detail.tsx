import { memo, useEffect } from 'react';
import { Box, Divider, ScrollView, Text, Toast, View } from 'native-base';
import { SafeAreaView } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/navigation';
import ActivityCard from './components/ActivityCard';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { navigates } from '../../navigation/navigate';
import { useClubActivity, useJoinActivity } from '../../service/club';

type RouterParams = RouteProp<RootStackParamList, 'ClubDetail'>;

export default memo(() => {
  const { params } = useRoute<RouterParams>();
  const navigation = useNavigation();
  const { data } = useClubActivity(
    ['clubActivity'],
    {
      clubId: params.clubId,
    },
    {
      enabled: !!params.clubId,
    },
  );

  const { mutateAsync } = useJoinActivity({
    onSuccess() {
      Toast.show({
        title: '你已成功加入该活动',
      });
    },
  });

  useEffect(() => {
    navigation.setOptions({
      title: params.clubName,
    });
  }, [params, navigation]);

  return (
    <SafeAreaView>
      <View flexDirection="column" position="relative" pb="12" h="full">
        <ScrollView>
          {data?.map(activity => (
            <ActivityCard
              name={activity.name}
              desc={activity.desc}
              createTime={activity.createdTime}
              onJoinActivity={async () => {
                await mutateAsync({
                  clubActivityId: activity.clubActivityId,
                });
              }}
            />
          ))}
        </ScrollView>

        <View position="absolute" bottom="0" h="12">
          <Divider />
          <View flexDir="row" bg="white" h="full">
            <View w="1/2" h="full" justifyContent="center" alignItems="center">
              <TouchableOpacity
                containerStyle={{
                  width: '100%',
                }}
                onPress={() => {
                  navigates('ClubVote', params);
                }}>
                <View
                  w="full"
                  h="full"
                  justifyContent="center"
                  alignItems="center">
                  <Text>投票记录</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View w="1/2" h="full" justifyContent="center" alignItems="center">
              <TouchableOpacity
                containerStyle={{
                  width: '100%',
                }}
                onPress={() => {
                  navigates('ClubPosts', params);
                }}>
                <View
                  w="full"
                  h="full"
                  justifyContent="center"
                  alignItems="center">
                  <Text>交流平台</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
});

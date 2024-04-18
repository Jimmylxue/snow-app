import { memo, useEffect } from 'react';
import { Divider, Text, Toast, View } from 'native-base';
import { SafeAreaView } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/navigation';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { navigates } from '../../navigation/navigate';
import { useSignInActivity } from '../../service/club';
import ActivityDetailCard from './components/ActivityDetailCard';

type RouterParams = RouteProp<RootStackParamList, 'ClubActivityDetail'>;

/**
 * 社团活动详情
 */
export default memo(() => {
  const { params } = useRoute<RouterParams>();
  const navigation = useNavigation();

  const { mutateAsync } = useSignInActivity({
    onSuccess() {
      Toast.show({
        title: '你已成功签到',
      });
    },
  });

  useEffect(() => {
    navigation.setOptions({
      title: params.activity.name,
    });
  }, [params, navigation]);

  return (
    <SafeAreaView>
      <View flexDirection="column" position="relative" pb="12" h="full">
        <ActivityDetailCard
          name={params.activity.name}
          desc={params.activity.desc}
          createTime={params.activity.createdTime}
          onJoinActivity={async () => {
            await mutateAsync({
              clubActivityId: params.activity.clubActivityId,
              clubId: params.activity.clubId,
            });
          }}
        />

        <View position="absolute" bottom="0" h="12">
          <Divider />
          <View flexDir="row" bg="white" h="full">
            <View w="1/2" h="full" justifyContent="center" alignItems="center">
              <TouchableOpacity
                containerStyle={{
                  width: '100%',
                }}
                onPress={() => {
                  navigates('SignInRecord', {
                    clubId: params.clubId,
                    activity: params.activity,
                  });
                }}>
                <View
                  w="full"
                  h="full"
                  justifyContent="center"
                  alignItems="center">
                  <Text>签到记录</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View w="1/2" h="full" justifyContent="center" alignItems="center">
              <TouchableOpacity
                containerStyle={{
                  width: '100%',
                }}
                onPress={() => {
                  navigates('FeedbackRecord', {
                    clubId: params.clubId,
                    activity: params.activity,
                  });
                }}>
                <View
                  w="full"
                  h="full"
                  justifyContent="center"
                  alignItems="center">
                  <Text>反馈记录</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
});

import { memo, useEffect } from 'react';
import { Button, Divider, ScrollView, View } from 'native-base';
import { SafeAreaView, TouchableOpacity } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/navigation';
import PostCard from './components/PostCard';
import { navigates } from '../../navigation/navigate';
import { usePostsList } from '../../service/club';

type RouterParams = RouteProp<RootStackParamList, 'ClubDetail'>;

export default memo(() => {
  const { params } = useRoute<RouterParams>();
  const navigation = useNavigation();

  const { data } = usePostsList(
    ['postsList'],
    {
      clubId: params.clubId,
    },
    {
      enabled: !!params.clubId,
    },
  );

  useEffect(() => {
    navigation.setOptions({
      title: params.clubName + ' - 交流平台',
    });
  }, [params, navigation]);

  return (
    <SafeAreaView>
      <View flexDirection="column" position="relative" pb="12" h="full">
        <ScrollView>
          {data?.map(item => (
            <TouchableOpacity
              key={item.id}
              onPress={() => {
                navigates('ClubPostsDetail', {
                  clubId: params.clubId,
                  postId: item.id,
                  postFather: item,
                });
              }}>
              <PostCard
                name={item.title}
                desc={item.content}
                createTime={item.createdTime}
                hideShowLove
              />
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View position="absolute" bottom="0" h="12" w="full" px="3">
          <Divider />
          <Button
            onPress={() => {
              navigates('ClubWritePosts', params);
            }}>
            我也说说
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
});

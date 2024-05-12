import { memo, useEffect } from 'react';
import { Button, Divider, ScrollView, View } from 'native-base';
import { SafeAreaView, TouchableOpacity } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/navigation';
import PostCard from './components/PostCard';
import { navigates } from '../../navigation/navigate';
import { usePostsList } from '../../service/club';
import { adaptive } from '../../utils';
import { useAppState } from '../../hooks/useAppState';
import { ERoleType } from '../../service';

type RouterParams = RouteProp<RootStackParamList, 'ClubPosts'>;

export default memo(() => {
  const { state } = useAppState();
  const isManager = state.userInfo?.role === ERoleType.管理员;

  const { params } = useRoute<RouterParams>();
  const navigation = useNavigation();

  const { data } = usePostsList(['postsList'], {
    clubId: 9999,
  });

  useEffect(() => {
    navigation.setOptions({
      title: '交流平台',
    });
  }, [params, navigation]);

  return (
    <SafeAreaView>
      <View
        style={{
          paddingTop: adaptive(200),
        }}
        flexDirection="column"
        position="relative"
        pb="12"
        h="full">
        <ScrollView>
          {data?.map(item => (
            <TouchableOpacity
              key={item.id}
              onPress={() => {
                navigates('ClubPostsDetail', {
                  clubId: 9999,
                  postId: item.id,
                  postFather: item,
                  isManager: isManager,
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

        {isManager && (
          <View position="absolute" bottom="0" h="12" w="full" px="3">
            <Divider />
            <Button
              onPress={() => {
                navigates('ClubWritePosts', {
                  clubId: 9999,
                  clubName: '帖子',
                });
              }}>
              我也说说
            </Button>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
});

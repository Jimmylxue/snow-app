import { memo } from 'react';
import { Button, Divider, ScrollView, Text, View } from 'native-base';
import { SafeAreaView, TouchableOpacity } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/navigation';
import PostCard from './components/PostCard';
import { navigates } from '../../navigation/navigate';
import { usePostsList } from '../../service/club';
import { useSleepInfo } from './core';
import { useAppState } from '../../hooks/useAppState';
import { ERoleType } from '../../service';

type RouterParams = RouteProp<RootStackParamList, 'ClubPosts'>;

export default memo(() => {
  const { state, signOut } = useAppState();
  const { params } = useRoute<RouterParams>();
  const isManager = state.userInfo?.role === ERoleType.管理员;
  const { isSleepTime } = useSleepInfo();
  const { data } = usePostsList(['postsList'], {
    clubId: 9999,
  });

  return (
    <SafeAreaView>
      {isSleepTime && !isManager ? (
        <View>
          <Text>已经是家长规定的休息时间，禁止刷家庭圈</Text>
        </View>
      ) : (
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
                    isManager: params.isManager,
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
      )}
    </SafeAreaView>
  );
});

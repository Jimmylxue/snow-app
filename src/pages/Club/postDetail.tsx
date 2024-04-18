import { memo, useState } from 'react';
import {
  Button,
  Divider,
  FormControl,
  Modal,
  ScrollView,
  TextArea,
  Toast,
  View,
} from 'native-base';
import { SafeAreaView } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/navigation';
import PostCard from './components/PostCard';
import PostComment from './components/PostComment';
import {
  useLikePost,
  usePostLikeCount,
  usePostsCommentList,
  useWritePostsComment,
} from '../../service/club';

type RouterParams = RouteProp<RootStackParamList, 'ClubPostsDetail'>;

export default memo(() => {
  const { params } = useRoute<RouterParams>();
  const [showModal, setShowModal] = useState(false);
  const [content, setContent] = useState<string>('');

  const { data, refetch } = usePostsCommentList(
    ['postComment'],
    {
      postId: params.postId,
      clubId: params.clubId,
    },
    {
      enabled: !!params.clubId && !!params.postId,
    },
  );

  const { data: likePostData, refetch: LRefetch } = usePostLikeCount(
    ['postLikeCount'],
    {
      postId: params.postId,
      clubId: params.clubId,
    },
    {
      enabled: !!params.clubId && !!params.postId,
    },
  );

  const { mutateAsync: likePost } = useLikePost({
    onSuccess() {
      Toast.show({
        title: '点赞成功',
      });
      LRefetch();
    },
  });

  const { mutateAsync } = useWritePostsComment({
    onSuccess() {
      Toast.show({ title: '评论成功' });
      refetch();
    },
  });

  return (
    <SafeAreaView>
      <View flexDirection="column" position="relative" pb="12" h="full">
        <PostCard
          name={params?.postFather?.title}
          desc={params?.postFather?.content}
          withOutMargin
          onLikePost={async () => {
            await likePost({
              clubId: params.clubId,
              postsId: params?.postFather?.id,
            });
          }}
          loveCount={likePostData?.length || 0}
        />
        <ScrollView>
          {data?.map(item => (
            <PostComment comment={item} key={item.commentId} />
          ))}
        </ScrollView>

        <View position="absolute" bottom="0" h="12" w="full" px="3">
          <Divider />
          <Button
            onPress={() => {
              setShowModal(true);
            }}>
            我也说说
          </Button>
        </View>
      </View>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>发布评论</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>评论内容</FormControl.Label>
              {/* @ts-ignore */}
              <TextArea
                aria-label="t1"
                numberOfLines={4}
                placeholder="大胆说出你想说的吧"
                // isInvalid
                _dark={{
                  placeholderTextColor: 'gray.300',
                }}
                mb="5"
                value={content}
                onChangeText={val => setContent(val)}
              />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setShowModal(false);
                }}>
                取消
              </Button>
              <Button
                onPress={async () => {
                  if (!content) {
                    Toast.show({ title: '请输入内容' });
                    return;
                  }
                  await mutateAsync({
                    postsId: params.postId,
                    clubId: params.clubId,
                    content,
                  });
                  setShowModal(false);
                }}>
                发布
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </SafeAreaView>
  );
});
